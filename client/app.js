'use strict';

const logger = require('debug')('lift.zone');
const App = require('ampersand-app');
const Domready = require('domready');
const Debounce = require('lodash.debounce');
const Router = require('./router');
const MainView = require('./main-view');
const Me = require('./models/me');
const Config = require('../config');
const Sync = require('ampersand-sync');

const checkingLogin = false;
const validLogin = true;
const lastCheckedLogin = '';

const checkLogin = Debounce((el) => {

    const code = document.location.search.match(/invite=([^&]*)/);
    const val = el.val();
    if (code) {
        code = code[1];
    }
    if (checkingLogin || lastCheckedLogin === el.val()) {
        return;
    }
    if (val === '') {
        //We're being called on the debounce tail after a bunch of backspaces
        return;
    }
    checkingLogin = true;
    lastCheckedLogin = val;
    const payload = {
        login: val,
        invite: code
    };
    const syncOptions = {
        url: App.apiUrl + '/taken',
        json: payload,
        success: function (resp) {

            checkingLogin = false;
            validLogin = !resp.data.taken;
            el.trigger('change.fndtn.abide');
        },
        error: function () {

            checkingLogin = false;
            validLogin = false;
            el.trigger('change.fndtn.abide');
        }
    };
    Sync('create', null, syncOptions);
}, 200);

App.extend({
    apiUrl: Config.APIURL,
    init: function () {

        $(document).foundation({
            abide: {
                validators: {
                    checkLogin: function (el, required) {


                        el = $(el);
                        if (required && el.val() === '') {
                            el.siblings('small').text('Login is required');
                            return false;
                        }
                        el.siblings('small').text('Login is taken');
                        checkLogin(el);
                        return validLogin;
                    }
                }
            }
        });

        this.view = new MainView({
            model: App.me,
            el: document.querySelector('[data-hook=app]')
        });
        $(document).foundation({
            reveal: {
                'dismiss_modal_class': 'dismiss-reveal-modal'
            }
        });

        this.router.history.start({ pushState: true });
    },
    setAccessToken: function (token) {

        if (this.accessToken !== token) {
            this.accessToken = token;
            if (Modernizr.localstorage) {
                if (token !== undefined) {
                    localStorage.accessToken = token;
                }
                else {
                    delete localStorage.accessToken;
                }
            }
            this.trigger('accessToken', token);
        }
    },
    router: new Router(),
    me: new Me(),
    log: logger,
    navigate: function (page) {

        const url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, { trigger: true });
    }
});

Domready(() => {

    if (Modernizr.localstorage) {
        App.setAccessToken(localStorage.accessToken);
    }
    App.init();
});

if (Config.DEV) {
    //Name something other than what modules assign locally so we don't accidentally rely on this in development
    window.liftApp = App;
}

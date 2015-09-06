var logger = require('debug')('lift.zone');
var app = require('ampersand-app');
var domready = require('domready');
var debounce = require('lodash.debounce');
var Router = require('./router');
var MainView = require('./main-view');
var Me = require('./models/me');
var Aliases = require('./models/aliases');
var config = require('../config');
var sync = require('ampersand-sync');

var checkingLogin = false;
var validLogin = true;
var lastCheckedLogin = '';

var checkLogin = debounce(function (el) {
    var code = document.location.search.match(/invite=([^&]*)/);
    var val = el.val();
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
    var payload = {
        data: {
            type: 'taken',
            id: 'taken',
            attributes: {
                login: val,
                invite: code
            }
        }
    };
    var syncOptions = {
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json'
        },
        url: app.apiUrl + '/taken',
        data: JSON.stringify(payload),
        success: function (resp) {
            checkingLogin = false;
            validLogin = !resp.data.attributes.taken;
            el.trigger('change.fndtn.abide');
        },
        error: function () {
            checkingLogin = false;
            validLogin = false;
            el.trigger('change.fndtn.abide');
        }
    };
    sync('create', null, syncOptions);
}, 200);

app.extend({
    apiUrl: config.APIURL,
    accountsUrl: config.ACCOUNTSURL,
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
            model: app.me,
            el: document.querySelector('[data-hook=app]')
        });
        $(document).foundation({
            reveal: {
                dismiss_modal_class: 'dismiss-reveal-modal'
            }
        });

        this.router.history.start({pushState: true});
    },
    setAccessToken: function (token) {
        if (this.accessToken !== token) {
            this.accessToken = token;
            if (Modernizr.localstorage) {
                if (token !== undefined) {
                    localStorage.accessToken = token;
                } else {
                    delete localStorage.accessToken;
                }
            }
            this.trigger('accessToken', token);
        }
    },
    router: new Router(),
    me: new Me(),
    cache: {
        aliases: new Aliases()
    },
    log: logger,
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    }
});

domready(function renderPage() {
    if (Modernizr.localstorage) {
        app.setAccessToken(localStorage.accessToken);
    }
    app.init();
});

if (config.DEV) {
    //Name something other than what modules assign locally so we don't accidentally rely on this in development
    window.liftApp = app;
}

'use strict';

var logger = require('debug')('lift.zone');
var App = require('ampersand-app');
var Domready = require('domready');
//var Debounce = require('lodash.debounce');
var Router = require('./router');
var MainView = require('./main-view');
var Me = require('./models/me');
var WorkoutSummaries = require('./models/workout-summaries');
var Config = require('../config');
//var Sync = require('ampersand-sync');

//var checkingLogin = false;
//var validLogin = true;
//var lastCheckedLogin = '';

//var checkLogin = Debounce(function (el) {

    //var code = document.location.search.match(/invite=([^&]*)/);
    //var val = el.val();
    //if (code) {
        //code = code[1];
    //}
    //if (checkingLogin || lastCheckedLogin === el.val()) {
        //return;
    //}
    //if (val === '') {
        ////We're being called on the debounce tail after a bunch of backspaces
        //return;
    //}
    //checkingLogin = true;
    //lastCheckedLogin = val;
    //var payload = {
        //login: val,
        //invite: code
    //};
    //var syncOptions = {
        //url: App.apiUrl + '/taken',
        //json: payload,
        //success: function (resp) {

            //checkingLogin = false;
            //validLogin = !resp.data.taken;
            //el.trigger('change.fndtn.abide');
        //},
        //error: function () {

            //checkingLogin = false;
            //validLogin = false;
            //el.trigger('change.fndtn.abide');
        //}
    //};
    //Sync('create', null, syncOptions);
//}, 200);


App.extend({
    apiUrl: Config.APIURL,
    assetsUrl: Config.ASSETSURL,
    init: function () {

        $(document).foundation({
            abide: {
                validators: {
                    passwordRequired: function (el) {

                        el = $(el);
                        console.log(el);
                        if (el.val() === '') {
                            return true;
                        }
                        el.siblings('small').text('Current Password is required');
                        return false;
                    }
                    //checkLogin: function (el, required) {


                        //el = $(el);
                        //if (required && el.val() === '') {
                            //el.siblings('small').text('Login is required');
                            //return false;
                        //}
                        //el.siblings('small').text('Login is taken');
                        //checkLogin(el);
                        //return validLogin;
                    //}
                }
            }
        });

        var self = this;
        if (App.me.loggedIn && !App.me.id) {
            //Wait for actual fetch to finish
            App.me.once('change:id', function () {

                self.render();
            });
            return;
        }
        self.render();
    },
    render: function () {

        this.view = new MainView({
            model: App.me,
            el: document.querySelector('[data-hook=app]')
        });
        $(document).foundation({
            reveal: {
                'dismiss_modal_class': 'dismiss-reveal-modal'
            }
        });

        this.router.history.start();
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
    workoutSummaries: new WorkoutSummaries(),
    log: logger,
    navigate: function (page) {

        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, { trigger: true });
    }
});

Domready(function () {

    if (Modernizr.localstorage) {
        App.setAccessToken(localStorage.accessToken);
    }
    App.init();
});

if (Config.DEV) {
    //Name something other than what modules assign locally so we don't accidentally rely on this in development
    window.liftApp = App;
}

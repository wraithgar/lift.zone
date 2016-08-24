'use strict';

var logger = require('debug')('lift.zone');
var App = require('ampersand-app');
var Domready = require('domready');
var Router = require('./router');
var MainView = require('./main-view');
var Me = require('./models/me');
var WorkoutSummaries = require('./models/workout-summaries');
var Config = require('../config');

App.extend({
    apiUrl: Config.APIURL,
    assetsUrl: Config.ASSETSURL,
    portalUrl: Config.PORTALURL,
    init: function () {

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
            if (token !== undefined) {
                localStorage.accessToken = token;
            }
            else {
                delete localStorage.accessToken;
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

    App.setAccessToken(localStorage.accessToken);
    App.init();
});

if (Config.DEV) {
    //Name something other than what modules assign locally so we don't accidentally rely on this in development
    window.liftApp = App;
}

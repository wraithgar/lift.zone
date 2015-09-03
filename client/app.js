/*global Modernizr, $*/
var logger = require('debug')('lift.zone');
var app = require('ampersand-app');
var domready = require('domready');
var ActivitiesModel = require('./models/activities');
var Router = require('./router');
var MainView = require('./main-view');
var Me = require('./models/me');
var Aliases = require('./models/aliases');
var config = require('../config');


app.extend({
    apiUrl: config.APIURL,
    accountsUrl: config.ACCOUNTSURL,
    init: function () {
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
                localStorage.accessToken = token;
            }
            this.trigger('accessToken', token);
        }
    },
    activities: new ActivitiesModel(),
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
    window.app = app;
}

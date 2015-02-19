/*global Modernizr, $*/
var andlog = require('andlog');
var app = require('ampersand-app');
var domready = require('domready');
var ActivitiesModel = require('./models/activities');
var Router = require('./router');
var MainView = require('./views/main');
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
        $(this.view.el).foundation();

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
    logger: andlog,
});

domready(function renderPage() {
    if (Modernizr.localstorage) {
        app.setAccessToken(localStorage.accessToken);
    }
    app.init();
});

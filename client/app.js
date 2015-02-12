/*global Modernizr*/
var andlog = require('andlog');
var domready = require('domready');
var ActivitiesModel = require('./models/activities');
var Router = require('./router');
var MainView = require('./views/main');
var MeView = require('./views/me');
var Me = require('./models/me');

var app = require('ampersand-app');

app.extend({
    init: function () {
        this.extend({
            apiUrl: document.querySelector('link[rel=api]').attributes.href.value,
            accountsUrl: document.querySelector('link[rel=accounts]').attributes.href.value
        });

        this.view = new MainView({
            el: document.querySelector('[data-hook=app]')
        });

        window.me = new Me();
        this.view.renderSubview(new MeView({
            model: window.me
        }), this.view.queryByHook('me'));

        this.router.history.start({pushState: true});
    },
    setAccessToken: function (token) {
        console.log('setAccessToken', token);
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
    logger: andlog,
});

domready(function renderPage() {
    if (Modernizr.localstorage) {
        app.setAccessToken(localStorage.accessToken);
    }
    app.init();
});

var andlog = require('andlog');
var domready = require('domready');
var ActivitiesModel = require('./models/activities');
var MainView = require('./views/main');
var MeModel = require('./models/me');
var Router = require('./router');

var app = require('ampersand-app');

app.extend({
    init: function () {
        this.extend({
            apiUrl: document.querySelector('link[rel=api]').attributes.href.value,
            accountsUrl: document.querySelector('link[rel=accounts]').attributes.href.value
        });

        this.me.fetch();
        this.view = new MainView({
            el: document.querySelector('[data-hook=app]')
        });

        this.router.history.start({pushState: true});
    },
    activities: new ActivitiesModel(),
    router: new Router(),
    logger: andlog,
    me: new MeModel()
});

domready(function renderPage() {
    app.init();
});

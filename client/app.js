var Router = require('router');
var andlog = require('andlog');
var domready = require('domready');
var ActivitiesModel = require('models/activities');
var MainView = require('views/main');
var MeModel = require('./models/me');

window.app = {
    init: function () {
        var self = this;

        this.activities = new ActivitiesModel();
        this.router = new Router();
        this.logger = andlog;
        this.me = new MeModel();

        domready(function renderPage() {
            self.apiUrl = document.querySelector('link[rel=api]').attributes.href.value;
            self.accountsUrl = document.querySelector('link[rel=accounts]').attributes.href.value;

            self.me.fetch();
            self.view = new MainView({
                el: document.body
            });

            self.router.history.start({pushState: true});
        });
    }
};

window.app.init();

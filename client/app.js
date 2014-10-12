var domready = require('domready');
var MainView = require('./views/main');
var Router = require('./router');
var ActivitiesModel = require('./models/activities');
var Wendler531Model = require('./models/wendler531');
var andlog = require('andlog');

window.app = {
    init: function () {
        var self = this;

        this.activities = new ActivitiesModel();
        this.wendler531 = new Wendler531Model();
        this.router = new Router();
        this.logger = andlog;

        domready(function renderPage() {
            self.view = new MainView({
                el: document.body
            });

            self.router.history.start({pushState: true});
        });
    }
};

window.app.init();

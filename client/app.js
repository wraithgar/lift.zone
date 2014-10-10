var domready = require('domready');
var MainView = require('./views/main');
var Router = require('./router');
var Activities = require('./models/activities');
var andlog = require('andlog');

window.app = {
    init: function () {
        var self = this;

        this.activities = new Activities();
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

var domready = require('domready');
var MainView = require('./views/main');
var Router = require('./router');
var Activities = require('./models/activities');

window.app = {
    init: function () {
        var self = this;

        this.lifts = new Activities();
        this.router = new Router();

        domready(function renderPage() {
            console.log(document.body);
            self.view = new MainView({
                el: document.body
            });

            self.router.history.start({pushState: true});
        });
    }
};

window.app.init();

console.log('app');

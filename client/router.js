/*global app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var FitocracyPage = require('./pages/fitocracy');
var AboutPage = require('./pages/about');
var Wendler531Page = require('./pages/wendler531');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'fitocracy': 'fitocracy',
        '531': 'calc531',
        'about': 'about'
    },
    home: function () {
        app.activities.reset();
        this.trigger('page', new HomePage());
    },
    fitocracy: function () {
        app.activities.reset();
        this.trigger('page', new FitocracyPage());
    },
    about: function () {
        this.trigger('page', new AboutPage());
    },
    calc531: function () {
        this.trigger('page', new Wendler531Page());
    }
});

var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var FitocracyPage = require('./pages/fitocracy');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'fitocracy': 'fitocracy'
    },
    home: function () {
        this.trigger('page', new HomePage());
    },
    fitocracy: function () {
        this.trigger('page', new FitocracyPage());
    }
});

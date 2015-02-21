var View = require('ampersand-view');
var templates = require('../templates');
var app = require('ampersand-app');

module.exports = View.extend({
    template: templates.pages.workout,
    initialize: function () {
        this.model.fetch({
            url: app.apiUrl + '/search/workouts/' + this.model.dateId
        });
    }
});

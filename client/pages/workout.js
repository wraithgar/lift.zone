var View = require('ampersand-view');
var app = require('ampersand-app');
var ActivityView = require('../views/activity');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.pages.workout,
    initialize: function () {
        window.workout = this.model;
        this.model.fetch({
            url: app.apiUrl + '/search/workouts/' + this.model.dateId
        });
    },
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        },
        'model.formattedDate': {
            type: 'text',
            hook: 'date'
        }
    },
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.model.activities, ActivityView, this.queryByHook('activities'));
    }
});

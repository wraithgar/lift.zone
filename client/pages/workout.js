var View = require('ampersand-view');
var app = require('ampersand-app');
var ActivityView = require('../views/activity');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.pages.workout,
    initialize: function () {
        this.model.fetch({
            url: app.apiUrl + '/search/workouts/' + this.model.dateId
        });
    },
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'workoutName'
        },
        'model.formattedDate': {
            type: 'text',
            hook: 'workoutDate'
        },
        'model.raw': {
            type: 'text',
            hook: 'raw'
        }
    },
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.model.activities, ActivityView, this.queryByHook('activities'));
    }
});

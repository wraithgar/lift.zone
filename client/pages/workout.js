'use strict';

const View = require('ampersand-view');
const ActivityView = require('../views/activity');

module.exports = View.extend({
    template: require('../templates/pages/workout.jade'),
    initialize: function () {

        //this.model.fetch({
            //url: App.apiUrl + '/search/workouts/' + this.model.dateId
        //});
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

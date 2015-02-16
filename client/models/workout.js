var app = require('ampersand-app');
var Model = require('ampersand-model');
var Activities = require('./activities');
var moment = require('moment');

module.exports = Model.extend({
    props: {
        id: 'number',
        name: ['string', true, 'My Workout'],
        date: ['date', true, function () { return new Date().valueOf();}]
    },
    collections: {
        activities: Activities
    },
    derived: {
        formattedDate: {
            deps: ['date'],
            fn: function () {
                return moment(this.date).format(app.me.dateFormat);
            }
        }
    }
});

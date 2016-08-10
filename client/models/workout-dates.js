'use strict';

var App = require('ampersand-app');
var Collection = require('ampersand-rest-collection');
var State = require('ampersand-State');
var ApiMixin = require('./mixins/api-collection');

var WorkoutDate = State.extend({
    idAttribute: 'date',
    props: {
        id: 'string',
        date: 'string'
    },
    derived: {
        datetime: {
            deps: ['date'],
            fn: function () {

                return new Date(this.date);
            }
        }
    }
});

var WorkoutDateCollection = Collection.extend(ApiMixin, {
    url: function () {

        return App.apiUrl + '/search/workouts/' + this.year;
    },
    model: WorkoutDate,
    fetchYear: function (year, cb) {

        this.fetch({
            success: cb,
            url: App.apiUrl + '/search/workouts/' + year
        });
    }
});

module.exports = WorkoutDateCollection;

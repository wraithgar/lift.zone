'use strict';

var App = require('ampersand-app');
var Model = require('ampersand-state');
var Collection = require('ampersand-rest-collection');
var ApiCollectionMixin = require('./mixins/api-collection');

var Sets = require('./sets');

var ActivityHistory = Model.extend({
    props: {
        name: 'string',
        workout_name: 'string',
        workout_date: 'string',
        comment: 'string'
    },
    derived: {
        hasComment: {
            deps: ['comment'],
            fn: function () {

                if (this.comment) {
                    return true;
                }
                return false;
            }
        },
        showUrl: {
            deps: ['workout_date'],
            fn: function () {

                return '/workouts/' + this.workout_date;
            }
        }
    },
    collections: {
        sets: Sets
    }
});

var ActivityHistories = Collection.extend(ApiCollectionMixin, {
    model: ActivityHistory,
    comparator: 'workout_date',
    initialize: function (opts) {

        this.id = opts.id;
    },
    url: function () {

        return App.apiUrl + '/activities/' + this.id + '/history';
    }
});

module.exports = ActivityHistories;

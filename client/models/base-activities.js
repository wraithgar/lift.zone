'use strict';

//Activities with no api mixin, for utils/parser

var Collection = require('ampersand-collection');
var Model = require('ampersand-model');
var Activity = require('./mixins/workout-activity');

var ActivityModel = Model.extend(Activity);

var ActivityCollection = Collection.extend({
    model: ActivityModel,
    indexes: ['name']
});

module.exports = ActivityCollection;

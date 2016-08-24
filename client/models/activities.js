'use strict';

var RestCollection = require('ampersand-rest-collection');
var ApiCollectionMixin = require('./mixins/api-collection');
var App = require('ampersand-app');

var ActivityModel = require('./activity');

var ActivityCollection = RestCollection.extend(ApiCollectionMixin, {
    comparator: 'name',
    url: function () {

        return App.apiUrl + '/activities';
    },
    model: ActivityModel
});

module.exports = ActivityCollection;

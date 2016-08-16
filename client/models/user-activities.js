'use strict';

var Collection = require('ampersand-collection');
var RestCollection = require('ampersand-rest-collection');
var Model = require('ampersand-model');
var ApiModelMixin = require('./mixins/api-model');
var ApiCollectionMixin = require('./mixins/api-collection');
var App = require('ampersand-app');

var AliasModel = Model.extend(ApiModelMixin, {
    urlRoot: function () {

        return App.apiUrl + '/activities';
    },
    props: {
        id: 'string',
        activity_id: 'string',
        name: 'string'
    }
});

var AliasCollection  = Collection.extend({
    model: AliasModel
});

var ActivityModel = Model.extend(ApiModelMixin, {
    urlRoot: function () {

        return App.apiUrl + '/activities';
    },
    props: {
        id: 'string',
        activity_id: 'string',
        name: 'string'
    },
    collections: {
        aliases: AliasCollection
    }
});

var ActivityCollection = RestCollection.extend(ApiCollectionMixin, {
    url: function () {

        return App.apiUrl + '/activities';
    },
    model: ActivityModel
});

module.exports = ActivityCollection;

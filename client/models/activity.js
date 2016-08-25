'use strict';

var Collection = require('ampersand-collection');
var Model = require('ampersand-model');
var ApiModelMixin = require('./mixins/api-model');
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
    comparator: 'name',
    model: AliasModel
});

var ActivityModel = Model.extend(ApiModelMixin, {
    urlRoot: function () {

        return App.apiUrl + '/activities';
    },
    props: {
        id: 'string',
        activity_id: 'string',
        name: 'string',
        alias: 'string'
    },
    derived: {
        displayName: {
            deps: ['name', 'alias'],
            fn: function () {

                return this.alias || this.name;
            }
        }
    },
    collections: {
        aliases: AliasCollection
    }
});

module.exports = ActivityModel;

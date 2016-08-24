'use strict';

var App = require('ampersand-app');
var Collection = require('ampersand-collection');
var Model = require('ampersand-model');
var ApiMixin = require('./mixins/api-model');
var Sets = require('./sets');
var Suggestions = require('./suggestions');

var ActivityModel = Model.extend(ApiMixin, {
    urlRoot: function () {

        return App.apiUrl + '/activities';
    },
    initialize: function (attrs, options) {

        var self = this;
        if (options && options.fetch) {
            self.fetch({
                url: App.apiUrl + '/suggest/activities/' + encodeURIComponent(self.name)
            });
        }
        self.listenTo(self.suggestions, 'add remove reset', function () {

            self.hasSuggestions = self.suggestions.length > 0;
        });
    },
    props: {
        id: 'string',
        activity_id: 'string',
        alias: 'string',
        comment: 'string',
        name: ['string', true]
    },
    collections: {
        sets: Sets,
        suggestions: Suggestions
    },
    session: {
        hasSuggestions: 'boolean'
    },
    derived: {
        displayName: {
            deps: ['name', 'alias'],
            fn: function () {

                return this.alias || this.name;
            }
        },
        hasComment: {
            deps: ['comment'],
            fn: function () {

                if (this.comment) {
                    return true;
                }
                return false;
            }
        },
        ready: {
            deps: ['id'],
            fn: function () {

                return !this.isNew();
            }
        },
        historyUrl: {
            deps: ['id'],
            fn: function () {

                if (this.id) {
                    return '/activities/' + this.id + '/history';
                }
                return '#';
            }
        }
    }
});

var ActivityCollection = Collection.extend({
    model: ActivityModel,
    indexes: ['name']
});

module.exports = ActivityCollection;

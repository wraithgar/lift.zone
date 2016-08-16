'use strict';

var Collection = require('ampersand-collection');
var Model = require('ampersand-model');
var ApiMixin = require('./mixins/api-model');
var ActivityMixin = require('./mixins/workout-activity');
var App = require('ampersand-app');

var ActivityModel = Model.extend(ApiMixin, ActivityMixin, {
    urlRoot: function () {

        return App.apiUrl + '/activities';
    },
    initialize: function (props) {

        var self = this;
        if (props) {
            self.fetch({
                url: App.apiUrl + '/suggest/activities/' + encodeURIComponent(self.name)
            });
        }
        self.listenTo(self.suggestions, 'add remove reset', function () {

            self.hasSuggestions = self.suggestions.length > 0;
        });
    }
});

var ActivityCollection = Collection.extend({
    model: ActivityModel,
    indexes: ['name']
});

module.exports = ActivityCollection;

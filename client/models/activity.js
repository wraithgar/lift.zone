var Model = require('ampersand-model');
var JsonApiMixin = require('./mixins/json-api');
var ActivityMixin = require('./mixins/activity');
var Sets = require('./set-collection');
var App = require('ampersand-app');

module.exports = Model.extend(JsonApiMixin, ActivityMixin, {
    urlRoot: function () {

        return App.apiUrl + '/activities';
    },
    initialize: function (props) {

        var self = this;
        if (props) {
            self.fetch({
                url: App.apiUrl + '/search/activities/' + self.name,
                error: function () {

                    //TODO when model sends proper xhr back check for 404 only
                    self.fetch({
                        url: App.apiUrl + '/suggestions/activities/' + self.name
                    });
                }
            });
        }
        self.listenTo(self.suggestions, 'add remove reset', function () {

            self.hasSuggestions = self.suggestions.length > 0;
        });
    }
});

var Model = require('ampersand-model');
var ApiMixin = require('./mixins/api');
var ActivityMixin = require('./mixins/activity');
var Sets = require('./set-collection');
var App = require('ampersand-app');
var Suggestions = require('./suggestion-collection');

module.exports = Model.extend(ApiMixin, ActivityMixin, {
    urlRoot: function () {

        return App.apiUrl + '/activityNames';
    },
    initialize: function (props) {

        var self = this;
        if (props) {
            self.fetch({
                url: App.apiUrl + '/suggestions/activityName/' + encodeURIComponent(self.name)
            });
        }
        self.listenTo(self.suggestions, 'add remove reset', function () {

            self.hasSuggestions = self.suggestions.length > 0;
        });
    }
});

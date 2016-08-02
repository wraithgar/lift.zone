'use strict';

const Model = require('ampersand-model');
const ApiMixin = require('./mixins/api');
const ActivityMixin = require('./mixins/activity');
//const Sets = require('./set-collection');
const App = require('ampersand-app');
//const Suggestions = require('./suggestion-collection');

module.exports = Model.extend(ApiMixin, ActivityMixin, {
    urlRoot: function () {

        return App.apiUrl + '/activityNames';
    },
    initialize: function (props) {

        const self = this;
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

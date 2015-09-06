var Model = require('./base');
var Activity = require('./base-activity');
var Sets = require('./sets');
var app = require('ampersand-app');

module.exports = Model.extend(Model, Activity, {
    urlRoot: function () { return app.apiUrl + '/activities'; },
    initialize: function (props) {
        var self = this;
        if (props) {
            self.fetch({
                url: app.apiUrl + '/search/activities/' + self.name,
                error: function () {
                    //TODO when model sends proper xhr back check for 404 only
                    self.fetch({
                        url: app.apiUrl + '/suggestions/activities/' + self.name
                    });
                }
            });
        }
        self.listenTo(self.suggestions, 'add remove reset', function () {
            self.hasSuggestions = self.suggestions.length > 0;
        });
    }
});

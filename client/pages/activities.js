'use strict';

var View = require('ampersand-view');
var ActivityView = require('../views/user-activity');
var App = require('ampersand-app');

module.exports = View.extend({
    template: require('../templates/pages/activities.jade'),
    initialize: function () {

        this.collection.fetch();
    },
    events: {
        'submit form[data-hook=activity-form]': 'addActivity'
    },
    render: function () {

        this.renderWithTemplate(this);
        this.renderCollection(this.collection, ActivityView, this.queryByHook('activities'));
        this.cacheElements({ activityModal: '[data-hook=activity-modal]' });
        $(this.el).foundation();
        return this;
    },
    addActivity: function (e) {

        e.preventDefault();
        App.view.message = '';
        var self = this;
        var name = self.query('[name=activity]').value;
        if (!name) {
            return;
        }
        var activity = new this.collection.model({ name: name });
        activity.save(null, {

            success: function () {

                self.collection.add(activity);
                self.query('[name=activity]').value = '';
            },
            error: function (model, newActivity, ctx) {

                if (ctx.xhr.status === 409) {
                    $(self.queryByHook('activity-exists')).foundation('reveal', 'open');
                }
                else {
                    App.view.message = 'Unknown error trying to save activity';
                }
            }
        });
    }
});

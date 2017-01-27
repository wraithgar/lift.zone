'use strict';

var App = require('ampersand-app');
var Dom = require('ampersand-dom');
var View = require('ampersand-view');

var ActivityView = require('../views/user-activity');

module.exports = View.extend({
    template: require('../templates/pages/activities.jade'),
    initialize: function () {

        this.collection.fetch({ reset: true });
    },
    events: {
        'click [data-hook=activities-prev]': 'prevActivities',
        'click [data-hook=activities-next]': 'nextActivities',
        'submit form[data-hook=activity-form]': 'addActivity'
    },
    rePaginate: function () {

        var next = this.queryByHook('activities-next');
        var prev = this.queryByHook('activities-prev');

        if (this.collection.hasNext()) {
            Dom.removeClass(next, 'disabled');
            Dom.removeAttribute(next, 'disabled');
        }
        if (this.collection.hasPrev()) {
            Dom.removeClass(prev, 'disabled');
            Dom.removeAttribute(prev, 'disabled');
        }
    },
    render: function () {

        this.renderWithTemplate(this);
        this.renderCollection(this.collection, ActivityView, this.queryByHook('activities'));
        this.cacheElements({ activityModal: '[data-hook=activity-modal]' });
        this.listenToAndRun(this.collection, 'reset', this.rePaginate);
        $(this.el).foundation();
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
    },
    prevActivities: function () {

        var prev = this.queryByHook('activities-prev');
        Dom.addClass(prev, 'disabled');
        Dom.addAttribute(prev, 'disabled');

        this.collection.prev();
    },
    nextActivities: function () {

        var next = this.queryByHook('activities-next');
        Dom.addClass(next, 'disabled');
        Dom.addAttribute(next, 'disabled');

        this.collection.next();
    }
});

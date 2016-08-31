'use strict';

var App = require('ampersand-app');
var Dom = require('ampersand-dom');
var PaginatedSubcollection = require('ampersand-paginated-subcollection');
var View = require('ampersand-view');

var ActivityView = require('../views/user-activity');

var perPage = 10;

module.exports = View.extend({
    template: require('../templates/pages/activities.jade'),
    initialize: function () {

        this.collection.fetch({ reset: true });
        this.paginatedCollection = new PaginatedSubcollection(this.collection, {
            limit: perPage
        });
    },
    events: {
        'click [data-hook=activities-prev]': 'prevActivities',
        'click [data-hook=activities-next]': 'nextActivities',
        'submit form[data-hook=activity-form]': 'addActivity'
    },
    rePaginate: function () {

        var next = this.queryByHook('activities-next');
        if (this.collection.length > perPage) {
            Dom.removeClass(next, 'disabled');
            Dom.removeAttribute(next, 'disabled');
        }
        this.paginatedCollection.configure({ offset: 0 });
    },
    render: function () {

        this.renderWithTemplate(this);
        this.renderCollection(this.paginatedCollection, ActivityView, this.queryByHook('activities'));
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

        var prev = this.queryByHook('activities-next');
        var next = this.queryByHook('activities-next');
        var offset = this.paginatedCollection.offset - perPage;
        Dom.removeClass(next, 'disabled');
        Dom.removeAttribute(next, 'disabled');
        Dom.removeClass(prev, 'disabled');
        Dom.removeAttribute(prev, 'disabled');
        if (offset < 0) {
            offset = 0;
        }
        if (offset === 0) {
            Dom.addAttribute(prev, 'disabled');
            Dom.addClass(prev, 'disabled');
        }
        this.paginatedCollection.configure({ offset: offset });
    },
    nextActivities: function () {

        var prev = this.queryByHook('activities-next');
        var next = this.queryByHook('activities-next');
        var max = this.collection.length - perPage;
        var offset = this.paginatedCollection.offset + perPage;
        Dom.removeClass(next, 'disabled');
        Dom.removeAttribute(next, 'disabled');
        Dom.removeClass(prev, 'disabled');
        Dom.removeAttribute(prev, 'disabled');
        if (offset + perPage > this.collection.length) {
            offset = max;
        }
        if (offset === max) {
            Dom.addAttribute(next, 'disabled');
            Dom.addClass(next, 'disabled');
        }
        this.paginatedCollection.configure({ offset: offset });
    }
});

'use strict';

var Dom = require('ampersand-dom');
var View = require('ampersand-view');
var PaginatedSubcollection = require('ampersand-paginated-subcollection');

var ActivityView = require('../views/activity-history');

var perPage = 10;

module.exports = View.extend({
    template: require('../templates/pages/activity-history.jade'),
    initialize: function () {

        this.model.fetch();
        this.activities = new PaginatedSubcollection(this.collection, {
            limit: perPage
        });
        this.collection.fetch({ sort: true, reset: true });
    },
    rePaginate: function () {

        var offset = this.collection.length - perPage;
        var prev = this.queryByHook('activities-prev');
        Dom.removeClass(prev, 'disabled');
        Dom.removeAttribute(prev, 'disabled');

        if (offset < 0) {
            offset = 0;
        }
        if (offset === 0) {
            Dom.addClass(prev, 'disabled');
            Dom.addAttribute(prev, 'disabled');
        }
        this.activities.configure({ offset: offset });
    },
    bindings: {
        'model.displayName': {
            type: 'text',
            hook: 'activity-name'
        }
    },
    render: function () {

        this.renderWithTemplate();
        this.renderCollection(this.activities, ActivityView, this.queryByHook('activity-history'));
        this.listenToAndRun(this.collection, 'reset', this.rePaginate);
    },
    events: {
        'click [data-hook=activities-prev]': 'prevActivities',
        'click [data-hook=activities-next]': 'nextActivities'
    },
    prevActivities: function () {

        var prev = this.queryByHook('activities-prev');
        var next = this.queryByHook('activities-next');
        var offset = this.activities.offset - perPage;
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
        this.activities.configure({ offset: offset });
    },
    nextActivities: function () {

        var prev = this.queryByHook('activities-prev');
        var next = this.queryByHook('activities-next');
        var max = this.collection.length - perPage;
        var offset = this.activities.offset + perPage;
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
        this.activities.configure({ offset: offset });
    }
});

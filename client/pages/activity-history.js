'use strict';

var Dom = require('ampersand-dom');
var View = require('ampersand-view');

var ActivityView = require('../views/activity-history');

module.exports = View.extend({
    template: require('../templates/pages/activity-history.pug'),
    initialize: function () {

        this.model.fetch();
        this.collection.fetch({ sort: true, reset: true });
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
    bindings: {
        'model.displayName': {
            type: 'text',
            hook: 'activity-name'
        }
    },
    render: function () {

        this.renderWithTemplate();
        this.renderCollection(this.collection, ActivityView, this.queryByHook('activity-history'));
        this.listenToAndRun(this.collection, 'reset', this.rePaginate);
    },
    events: {
        'click [data-hook=activities-prev]': 'prevActivities',
        'click [data-hook=activities-next]': 'nextActivities'
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

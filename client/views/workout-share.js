'use strict';

var View = require('ampersand-view');
var MarkdownActivityShortView = require('./markdown-activity-short');
var MarkdownActivityLongView = require('./markdown-activity-long');
var BBCodeActivityShortView = require('./bbcode-activity-short');
var BBCodeActivityLongView = require('./bbcode-activity-long');

module.exports = View.extend({
    template: require('../templates/views/workout-share.pug'),
    session: {
        style: 'string'
    },
    initialize: function () {

        this.style = 'markdown-short';
    },
    render: function () {

        this.renderWithTemplate(this);
        this.renderCollection(this.model.activities, MarkdownActivityShortView, this.queryByHook('activities-markdown-short'));
        this.renderCollection(this.model.activities, MarkdownActivityLongView, this.queryByHook('activities-markdown-long'));
        this.renderCollection(this.model.activities, BBCodeActivityShortView, this.queryByHook('activities-bbcode-short'));
        this.renderCollection(this.model.activities, BBCodeActivityLongView, this.queryByHook('activities-bbcode-long'));
    },
    bindings: {
        style: {
            type: 'switch',
            cases: {
                'markdown-short': '[data-hook=markdown-short-share]',
                'markdown-long': '[data-hook=markdown-long-share]',
                'bbcode-short': '[data-hook=bbcode-short-share]',
                'bbcode-long': '[data-hook=bbcode-long-share]'
            }
        },
        'model.formattedDate': {
            type: 'text',
            hook: 'workout-date'
        },
        'model.name': {
            type: 'text',
            hook: 'workout-name'
        },
        'model.shareLink': [{
            type: 'attribute',
            hook: 'share-link',
            name: 'href'
        }, {
            type: 'text',
            hook: 'share-link'
        }],
        'model.canShare': [{
            type: 'toggle',
            hook: 'show-share-link'
        }, {
            type: 'toggle',
            hook: 'no-share-link',
            invert: true
        }]
    },
    events: {
        'click [name=share-style]': 'changeStyle'
    },
    changeStyle: function (e) {

        this.style = e.target.value;
    }
});


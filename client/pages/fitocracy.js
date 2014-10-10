/*global app*/
var View = require('ampersand-view');
var caber = require('caber');
var templates = require('../templates');
var debounce = require('../lib/debounce');
var MarkdownView = require('../views/markdown');
var BBCodeView = require('../views/bbcode');

module.exports = View.extend({
    template: templates.pages.fitocracy,
    initialize: function () {
        this.throttledParse = debounce(this.parseRaw, 1000);
    },
    events: {
        'input [data-hook=raw]': 'rawChanged',
        'change [data-hook=format]': 'changeFormat'
    },
    rawChanged: function (e) {
        e.preventDefault();
        this.throttledParse();
    },
    parseRaw: function () {
        var raw = this.queryByHook('raw').value;
        var parsed = caber.fitocracy(raw);
        var models = Object.keys(parsed).map(function (activity) {
            return {name: activity, reps: parsed[activity]};
        });
        app.activities.reset(models, {parse: true});
    },
    changeFormat: function (e) {
        e.preventDefault();
        if (this.formattedView) {
            this.formattedView.remove();
        }
        if (e.target.value === 'md') {
            this.formattedView = this.renderCollection(app.activities, MarkdownView, this.queryByHook('formatted'));
        } else {
            this.formattedView = this.renderCollection(app.activities, BBCodeView, this.queryByHook('formatted'));
        }
    }
});

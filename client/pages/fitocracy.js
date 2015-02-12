var app = require('ampersand-app');
var View = require('ampersand-view');
var caber = require('caber');
var templates = require('../templates');
var debounce = require('../lib/debounce');
var MarkdownView = require('../views/markdown');
var MarkdownFullView = require('../views/markdownFull');
var BBCodeView = require('../views/bbcode');
var BBCodeFullView = require('../views/bbcodeFull');
var MarkdownCreditsView = require('../views/markdownCredits');
var BBCodeCreditsView = require('../views/bbcodeCredits');

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
        app.activities.reset(parsed, {parse: true});
    },
    changeFormat: function (e) {
        e.preventDefault();
        if (this.formattedView) {
            this.formattedView.remove();
            this.creditsView.remove();
        }
        if (e.target.value === 'md') {
            this.formattedView = this.renderCollection(app.activities, MarkdownView, this.queryByHook('formatted'));
            this.creditsView = this.renderSubview(new MarkdownCreditsView(), this.queryByHook('credits'));
        } else if (e.target.value === 'mdFull') {
            this.formattedView = this.renderCollection(app.activities, MarkdownFullView, this.queryByHook('formatted'));
            this.creditsView = this.renderSubview(new MarkdownCreditsView(), this.queryByHook('credits'));
        } else if (e.target.value === 'bb') {
            this.formattedView = this.renderCollection(app.activities, BBCodeView, this.queryByHook('formatted'));
            this.creditsView = this.renderSubview(new BBCodeCreditsView(), this.queryByHook('credits'));
        } else {
            this.formattedView = this.renderCollection(app.activities, BBCodeFullView, this.queryByHook('formatted'));
            this.creditsView = this.renderSubview(new BBCodeCreditsView(), this.queryByHook('credits'));
        }
    }
});

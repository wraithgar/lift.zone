var View = require('ampersand-view');
var caber = require('caber');
var debounce = require('../lib/debounce');
var MarkdownView = require('../views/markdown');
var MarkdownFullView = require('../views/markdownFull');
var BBCodeView = require('../views/bbcode');
var BBCodeFullView = require('../views/bbcodeFull');
var MarkdownCreditsView = require('../views/markdownCredits');
var BBCodeCreditsView = require('../views/bbcodeCredits');

module.exports = View.extend({
    template: require('../templates/pages/parser.jade'),
    initialize: function () {
        this.throttledParse = debounce(this.parseRaw, 1000);
    },
    events: {
        'input [data-hook=raw]': 'rawChanged',
        'change [data-hook=format]': 'changeFormat'
    },
    rawChanged: function (e) {
        e.preventDefault();
        this.throttledParse(e);
    },
    parseRaw: function (e) {
        var raw = e.target.value;
        var parsed = caber.parse(raw);
        this.collection.reset(parsed, {parse: true});
    },
    changeFormat: function (e) {
        e.preventDefault();
        if (this.formattedView) {
            this.formattedView.remove();
            this.creditsView.remove();
        }
        if (e.target.value === 'md') {
            this.formattedView = this.renderCollection(this.collection, MarkdownView, this.queryByHook('formatted'));
            this.creditsView = this.renderSubview(new MarkdownCreditsView(), this.queryByHook('credits'));
        } else if (e.target.value === 'mdFull') {
            this.formattedView = this.renderCollection(this.collection, MarkdownFullView, this.queryByHook('formatted'));
            this.creditsView = this.renderSubview(new MarkdownCreditsView(), this.queryByHook('credits'));
        } else if (e.target.value === 'bb') {
            this.formattedView = this.renderCollection(this.collection, BBCodeView, this.queryByHook('formatted'));
            this.creditsView = this.renderSubview(new BBCodeCreditsView(), this.queryByHook('credits'));
        } else {
            this.formattedView = this.renderCollection(this.collection, BBCodeFullView, this.queryByHook('formatted'));
            this.creditsView = this.renderSubview(new BBCodeCreditsView(), this.queryByHook('credits'));
        }
    }
});

var View = require('ampersand-view');
var Caber = require('caber');
var Debounce = require('lodash.debounce');
var MarkdownView = require('../views/markdown');
var MarkdownFullView = require('../views/markdown-full');
var BBCodeView = require('../views/bbcode');
var BBCodeFullView = require('../views/bbcode-full');
var MarkdownCreditsView = require('../views/markdown-credits');
var BBCodeCreditsView = require('../views/bbcode-credits');

module.exports = View.extend({
    template: require('../templates/pages/parser.jade'),
    initialize: function () {

        this.throttledParse = Debounce(this.parseRaw, 1000);
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
        var parsed = Caber.parse(raw);
        this.collection.reset(parsed, { parse: false });
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

/*global $ */
'use strict';

var View = require('ampersand-view');
var SetView = require('./set');
var SuggestionView = require('./suggestion');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.activity,
    bindings: {
        'model.displayName': {
            type: 'text',
            hook: 'name'
        },
        'model.comment': [{
            type: 'text',
            hook: 'comment'
        }, {
            type: 'toggle',
            hook: 'comment'
        }],
        'model.ready': {
            type: 'toggle',
            no: '[data-hook=new]'
        },
        'model.hasSuggestions': {
            type: 'toggle',
            hook: 'hasSuggestions'
        }
    },
    events: {
        'click [data-hook=new]': 'findAlias',
        'click [data-hook=name]': 'selfAlias'
    },
    render: function () {
        this.renderWithTemplate();
        this.renderSubview(new SuggestionView({model: this.model}), this.queryByHook('newActivity'));
        this.renderCollection(this.model.sets, SetView, this.queryByHook('sets'));
        this.renderCollection(this.model.suggestions, SuggestionView, this.queryByHook('suggestions'));
        this.cacheElements({aliasModal: '[data-hook=chooseAlias]'});
        return this;
    },
    findAlias: function () {
        $(this.aliasModal).foundation('reveal', 'open');
    },
    selfAlias: function () {
        console.log('choosing self alias');
    },
    closeModal: function () {
        console.log('closemodal');
        $(this.aliasModal).foundation('reveal', 'close');
    }
});

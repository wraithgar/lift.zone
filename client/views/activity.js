/*global $ */
'use strict';

var View = require('ampersand-view');
var SetView = require('./set');
var SuggestionView = require('./suggestion');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.activity,
    bindings: {
        'model.name': {
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
        }
    },
    events: {
        'click [data-hook=new]': 'findAlias'
    },
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.model.sets, SetView, this.queryByHook('sets'));
        this.renderCollection(this.model.suggestions, SuggestionView, this.queryByHook('suggestions'));
        return this;
    },
    findAlias: function () {
        $(this.queryByHook('chooseAlias')).foundation('reveal', 'open');
        console.log('search for an alias', this.model.suggestions);
    }
});

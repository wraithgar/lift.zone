'use strict';

var View = require('ampersand-view');

var SuggestionView = require('./suggestion');

var SetView = View.extend({
    template: require('../templates/views/set-short.jade'),
    bindings: {
        'model.formattedShort': {
            type: 'text',
            hook: 'set'
        },
        'model.pr': {
            type: 'booleanClass',
            hook: 'set',
            class: 'pr'
        }
    }
});

module.exports = View.extend({
    template: require('../templates/views/workout-activity-short.jade'),
    bindings: {
        'model.displayName': {
            type: 'text',
            hook: 'activity-name'
        },
        'model.historyUrl': {
            type: 'attribute',
            name: 'href',
            hook: 'activity-name'
        },
        'model.comment': {
            type: 'text',
            hook: 'activity-comment'
        },
        'model.ready': {
            type: 'toggle',
            no: '[data-hook=new-activity]'
        },
        'model.hasSuggestions': {
            type: 'toggle',
            hook: 'has-suggestions'
        },
        'model.hasComment': {
            type: 'toggle',
            hook: 'toggle-comment'
        }
    },
    events: {
        'click [data-hook=new-activity]': 'findAlias',
        'click [data-hook=name]': 'selfAlias'
    },
    render: function () {

        this.renderWithTemplate(this);
        this.renderSubview(new SuggestionView({ model: this.model }), this.queryByHook('new-confirm'));
        this.renderCollection(this.model.sets, SetView, this.queryByHook('sets'));
        this.renderCollection(this.model.suggestions, SuggestionView, this.queryByHook('suggestions'));
        this.cacheElements({ aliasModal: '[data-hook=choose-alias]' });
        $(this.el).foundation();
        return this;
    },
    findAlias: function () {

        $(this.aliasModal).foundation('reveal', 'open');
    },
    selfAlias: function () {

        console.log('choosing self alias');
    },
    closeModal: function () {

        $(this.aliasModal).foundation('reveal', 'close');
    }
});

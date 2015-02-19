'use strict';

var View = require('ampersand-view');
var SetView = require('./set');
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
        return this;
    },
    findAlias: function () {
        console.log('search for an alias', this.suggestions);
    }
});

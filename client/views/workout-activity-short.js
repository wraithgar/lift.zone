'use strict';

var View = require('ampersand-view');

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
        'model.comment': [{
            type: 'text',
            hook: 'activity-comment'
        }, {
            type: 'toggle',
            hook: 'activity-comment'
        }],
        'model.hasComment': {
            type: 'toggle',
            hook: 'toggle-comment'
        }
    },
    render: function () {

        this.renderWithTemplate(this);
        this.renderCollection(this.model.sets, SetView, this.queryByHook('sets'));
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

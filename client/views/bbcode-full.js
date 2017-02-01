'use strict';

var View = require('ampersand-view');
var RepView = require('../views/bbcode-rep');

module.exports = View.extend({
    template: require('../templates/views/bbcode.pug'),
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        },
        'model.comment': {
            type: 'text',
            hook: 'comment'
        },
        'model.hasComment': {
            type: 'toggle',
            hook: 'commentLabel'
        }
    },
    render: function () {

        this.renderWithTemplate();
        this.renderCollection(this.model.sets, RepView, this.queryByHook('sets'));
    }
});

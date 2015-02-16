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
        }]
    },
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.model.sets, SetView, this.queryByHook('sets'));
        return this;
    }
});

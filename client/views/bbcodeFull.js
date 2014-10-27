var View = require('ampersand-view');
var RepView = require('./bbcodeRep');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.bbcode,
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        }
    },
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.model.reps, RepView, this.queryByHook('sets'));
    }
});

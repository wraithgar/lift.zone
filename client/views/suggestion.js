var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.suggestion,
    events: {
        'click a': 'chooseAlias'
    },
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        }
    },
    chooseAlias: function () {
        console.log(this.model.parent);
    }
});

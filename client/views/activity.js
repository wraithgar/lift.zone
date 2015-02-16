var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.activity,
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        }
    }
});

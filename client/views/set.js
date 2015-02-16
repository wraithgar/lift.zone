var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.set,
    bindings: {
        'model.formattedFull': {
            type: 'text',
            hook: 'set'
        }
    }
});

var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.markdownRep,
    bindings: {
        'model.formatted': {
            type: 'text',
            hook: 'rep'
        }
    }
});

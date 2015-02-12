var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.bbcodeRep,
    bindings: {
        'model.formattedFull': {
            type: 'text',
            hook: 'rep'
        },
        'model.nonpr': {
            type: 'booleanClass',
            name: 'nonpr',
            hook: 'pr'
        }
    }
});

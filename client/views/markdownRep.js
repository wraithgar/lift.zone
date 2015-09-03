var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/views/markdownRep.jade'),
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

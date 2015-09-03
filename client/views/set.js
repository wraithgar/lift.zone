var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/views/set.jade'),
    bindings: {
        'model.formattedFull': {
            type: 'text',
            hook: 'set'
        }
    }
});

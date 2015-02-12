var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.me,
    bindings: {
        'model.displayName': {
            type: 'text'
        }
    }
});

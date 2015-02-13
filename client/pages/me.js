var View = require('ampersand-view');
var templates = require('../templates');
var app = require('ampersand-app');

module.exports = View.extend({
    template: templates.pages.me,
    bindings: {
        'model.login': {
            type: 'text',
            hook: 'login'
        },
        'model.name': {
            type: 'text',
            hook: 'name'
        },
        'model.email': {
            type: 'text',
            hook: 'email'
        },
        'model.invalid': {
            type: 'toggle',
            hook: 'invalid'
        }
    },
    render: function () {
        this.renderWithTemplate({accountsUrl: app.accountsUrl});
    },
    autoRender: true
});


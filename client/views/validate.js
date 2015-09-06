var View = require('ampersand-view');
var app = require('ampersand-app');
var sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/validate.jade'),
    render: function () {
        this.renderWithTemplate(this)
        this.validate();
        return this;
    },
    validate: function () {
        var self = this;
        var payload = {
            data: {
                type: 'validation',
                id: this.parent.code
            }
        };
        var syncOptions = {
            headers: app.me.ajaxConfig().headers,
            url: app.apiUrl + '/me/confirm',
            data: JSON.stringify(payload),
            success: function () {
                app.me.validated = true;
                self.parent.stage = 'validated';
            },
            error: function () {
                app.view.message = 'Invalid code';
            }
        };
        sync('create', null, syncOptions);
    }
});

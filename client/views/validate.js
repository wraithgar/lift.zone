var View = require('ampersand-view');
var App = require('ampersand-app');
var Sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/validate.jade'),
    render: function () {

        this.renderWithTemplate(this);
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
            headers: App.me.ajaxConfig().headers,
            url: App.apiUrl + '/me/confirm',
            data: JSON.stringify(payload),
            success: function () {

                App.me.validated = true;
                self.parent.stage = 'validated';
            },
            error: function () {

                App.view.message = 'Invalid code';
            }
        };
        Sync('create', null, syncOptions);
    }
});

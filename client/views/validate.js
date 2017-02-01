'use strict';

var View = require('ampersand-view');
var App = require('ampersand-app');
var Sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/validate.pug'),
    render: function () {

        this.renderWithTemplate(this);
        this.validate();
        return this;
    },
    validate: function () {

        var self = this;
        var payload = {
            token: this.parent.token
        };
        var syncOptions = {
            headers: App.me.ajaxConfig().headers,
            url: App.apiUrl + '/user/confirm',
            json: payload,
            success: function () {

                App.me.validated = true;
                self.parent.stage = 'validated';
            },
            error: function () {

                App.view.message = 'Invalid token';
            }
        };
        Sync('create', null, syncOptions);
    }
});

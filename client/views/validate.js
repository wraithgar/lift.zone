'use strict';

const View = require('ampersand-view');
const App = require('ampersand-app');
const Sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/validate.jade'),
    render: function () {

        this.renderWithTemplate(this);
        this.validate();
        return this;
    },
    validate: function () {

        const self = this;
        const payload = {
            token: this.parent.token
        };
        const syncOptions = {
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

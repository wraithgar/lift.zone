'use strict';

const View = require('ampersand-view');
const App = require('ampersand-app');
const Sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/request-recover.jade'),
    events: {
        'submit form': 'request'
    },
    request: function (e) {

        e.preventDefault(e);
        App.view.message = '';
        const email = this.query('[name=email]').value;
        const payload = {
            email: email
        };
        const syncOptions = {
            headers: App.me.ajaxConfig().headers,
            url: App.apiUrl + '/user/recover',
            json: payload,
            success: function (model, resp) {

                App.view.message = 'Email sent, good luck.  Check your inbox and click the link.  The link expires in three hours.';
            },
            error: function () {

                App.view.message = 'Unknown error trying to validate.';
            }
        };
        Sync('create', null, syncOptions);
    }
});

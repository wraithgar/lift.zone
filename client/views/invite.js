'use strict';

var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/views/signup-invite.jade'),
    session: {
        status: 'string'
    },
    bindings: {
        'model.token': {
            type: 'attribute',
            hook: 'token',
            name: 'value'
        },
        'status': [
            {
                type: 'text',
                hook: 'invite-status'
            }, {
                type: 'toggle',
                hook: 'invite-status'
            }
        ]
    },
    events: {
        'submit form': 'checkInvite'
    },
    render: function () {

        this.renderWithTemplate(this);
        if (this.model.token) {
            this.checkInvite();
        }
        return this;
    },
    checkInvite: function (e) {

        if (e) {
            e.preventDefault();
        }
        var self = this;
        self.status = 'Checking invite...';
        var token = self.query('[name=invite]').value;
        self.model.token = token;
        self.model.fetch({
            success: function () {

                self.status = '';
                self.parent.stage = 'signup';
            },
            error: function () {

                self.status = '';
                $(self.queryByHook('invalid')).foundation('reveal', 'open');
            }
        });
    }
});

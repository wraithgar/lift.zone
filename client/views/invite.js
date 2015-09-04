var View = require('ampersand-view');
var app = require('ampersand-app');
var Invite = require('../models/invite');

module.exports = View.extend({
    template: require('../templates/views/invite.jade'),
    session: {
        status: 'string'
    },
    bindings: {
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
        $(this.el).foundation();
        if (this.model.code) {
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
        var code = self.query('[name=invite]').value;
        self.model.fetch({
            success: function () {
                self.status = '';
                self.parent.stage = 'signup';
            },
            error: function () {
                self.status = '';
                $(self.queryByHook('invalid')).foundation('reveal', 'open');
            }
        })
    }
});

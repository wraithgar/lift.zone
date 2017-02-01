'use strict';

var View = require('ampersand-view');

var InviteView = View.extend({
    template: require('../templates/views/user-invite.pug'),
    bindings: {
        'model.token': {
            type: 'text',
            hook: 'token'
        }
    }
});

module.exports = View.extend({
    template: require('../templates/pages/invites.pug'),
    render: function () {

        this.renderWithTemplate(this);
        this.renderCollection(this.model.invites, InviteView, this.queryByHook('invites'));
        this.model.invites.fetch();
    }
});

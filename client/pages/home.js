var View = require('ampersand-view');
var app = require('ampersand-app');

module.exports = View.extend({
    template: require('../templates/pages/home.jade'),
    initialize: function () {
        this.listenTo(app.me, 'change', this.render.bind(this));
    },
    events: {
        'submit form': 'invite',
    },
    render: function () {
        this.renderWithTemplate(app.me);
        return this;
    },
    invite: function (e) {
        e.preventDefault();

        var inviteCode = this.query('[name=invite]').value;
        app.navigate('/signup?invite=' + encodeURIComponent(inviteCode));
    }
});

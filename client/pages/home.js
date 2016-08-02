'use strict';

const View = require('ampersand-view');
const App = require('ampersand-app');

module.exports = View.extend({
    template: require('../templates/pages/home.jade'),
    initialize: function () {

        this.listenTo(App.me, 'change', this.render.bind(this));
    },
    events: {
        'submit form': 'invite'
    },
    render: function () {

        this.renderWithTemplate(App.me);
        return this;
    },
    invite: function (e) {

        e.preventDefault();

        const inviteCode = this.query('[name=invite]').value;
        App.navigate('/signup?invite=' + encodeURIComponent(inviteCode));
    }
});

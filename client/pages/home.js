'use strict';

var View = require('ampersand-view');
var App = require('ampersand-app');

module.exports = View.extend({
    template: require('../templates/pages/home.pug'),
    initialize: function () {

        this.listenTo(App.me, 'change', this.render.bind(this));
    },
    session: {
        assetsUrl: 'string'
    },
    events: {
        'submit form': 'invite'
    },
    render: function () {

        this.renderWithTemplate({ me: App.me, assetsUrl: this.assetsUrl });
        $(this.el).foundation();
        return this;
    },
    invite: function (e) {

        e.preventDefault();

        var inviteCode = this.query('[name=invite]').value;
        App.navigate('/signup?invite=' + encodeURIComponent(inviteCode));
    }
});

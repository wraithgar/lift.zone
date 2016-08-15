'use strict';

var View = require('ampersand-view');
var Querystring = require('querystring');
var ViewSwitcher = require('ampersand-view-switcher');
var InviteView = require('../views/invite');
var SignupView = require('../views/signup');
var InviteModel = require('../models/invite');

module.exports = View.extend({
    template: require('../templates/pages/signup.jade'),
    initialize: function () {

        var params = Querystring.parse(window.location.search.slice('1'));
        var token = params.invite && params.invite.replace(/\s+/, '');
        this.invite = new InviteModel({ token: token });
        this.listenTo(this, 'change:stage', this.renderStage.bind(this));
    },
    session: {
        'stage': 'string'
    },
    render: function () {

        this.renderWithTemplate(this);
        this.queryByHook('stage').innerHTML = ''; //This clears out the static content
        this.stages = new ViewSwitcher(this.queryByHook('stage'), {
            show: function (view) {

                $(view.el).foundation();
            }
        });
        this.stage = 'invite';
        return this;
    },
    renderStage: function () {

        if (this.stage === 'signup') {
            return this.stages.set(new SignupView({ model: this.invite, parent: this }));
        }
        return this.stages.set(new InviteView({ model: this.invite, parent: this }));
    }
});

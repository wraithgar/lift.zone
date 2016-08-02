'use strict';

const View = require('ampersand-view');
const Querystring = require('querystring');
const ViewSwitcher = require('ampersand-view-switcher');
const InviteView = require('../views/invite');
const SignupView = require('../views/signup');
const InviteModel = require('../models/invite');

module.exports = View.extend({
    template: require('../templates/pages/signup.jade'),
    initialize: function () {

        //const params = Querystring.parse(window.location.search.slice('1'));
        const params = Querystring.parse(window.location.hash.split('?')[1]);
        const token = params.invite && params.invite.replace(/\s+/, '');
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

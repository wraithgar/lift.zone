var View = require('ampersand-view');
var app = require('ampersand-app');
var querystring = require('querystring');
var ViewSwitcher = require('ampersand-view-switcher');
var InviteView = require('../views/invite');
var SignupView = require('../views/signup');
var DoneView = require('../views/signedup');
var InviteModel = require('../models/invite');

module.exports = View.extend({
    template: require('../templates/pages/signup.jade'),
    initialize: function () {
        var params = querystring.parse(window.location.search.slice('1'));
        this.invite = new InviteModel({ code: params.invite });
        this.stage = 'invite';
        this.listenTo(this, 'change:stage', this.renderStage.bind(this));
    },
    session: {
        'stage': 'string'
    },
    render: function () {
        this.renderWithTemplate(this);
        this.stages = new ViewSwitcher(this.queryByHook('stage'), {
            show: function (view) {
                $(view.el).foundation();
            }
        });
        this.renderStage();
        return this;
    },
    renderStage: function () {
        if (this.stage === 'signup') {
            return this.stages.set(new SignupView({model: this.invite, parent: this}));
        }
        if (this.stage === 'done') {
            return this.stages.set(new DoneView());
        }
        return this.stages.set(new InviteView({model: this.invite, parent: this}));
    }
});

'use strict';

var View = require('ampersand-view');
var Querystring = require('querystring');
var ViewSwitcher = require('ampersand-view-switcher');
var RequestView = require('../views/request-validation');
var ValidateView = require('../views/validate');

var ValidatedView = View.extend({
    template: require('../templates/views/validated.jade')
});

module.exports = View.extend({
    template: require('../templates/pages/validate.jade'),
    initialize: function () {

        this.listenTo(this, 'change:stage', this.renderStage.bind(this), {
            show: function (view) {

                $(view.el).foundation();
            }
        });
    },
    session: {
        'token': 'string',
        'stage': 'string'
    },
    render: function () {

        var params = Querystring.parse(window.location.search.slice('1'));
        this.token = params.token && params.token.replace(/\s+/, '');
        this.renderWithTemplate(this);
        this.stages = new ViewSwitcher(this.queryByHook('stage'));
        if (this.model.validated) {
            this.stage = 'validated';
        }
        else if (this.token) {
            this.stage = 'validate';
        }
        else {
            this.stage = 'request';
        }
        return this;
    },
    renderStage: function () {

        if (this.stage === 'validated') {
            return this.stages.set(new ValidatedView());
        }
        if (this.stage === 'validate') {
            return this.stages.set(new ValidateView({ parent: this }));
        }
        return this.stages.set(new RequestView({ model: this.model }));
    }
});


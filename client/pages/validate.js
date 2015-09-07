var View = require('ampersand-view');
var app = require('ampersand-app');
var querystring = require('querystring');
var ViewSwitcher = require('ampersand-view-switcher');
var RequestView = require('../views/request-validation');
var ValidateView = require('../views/validate');
var ValidatedView = require('../views/validated');

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
        'code': 'string',
        'stage': 'string'
    },
    render: function () {
        var params = querystring.parse(window.location.search.slice('1'));
        this.renderWithTemplate(this);
        this.stages = new ViewSwitcher(this.queryByHook('stage'));
        if (this.model.validated) {
            this.stage = 'validated';
        } else if (params.code) {
            this.code = params.code;
            this.stage = 'validate';
        } else {
            this.stage = 'request';
        }
        return this;
    },
    renderStage: function () {
        if (this.stage === 'validated') {
            return this.stages.set(new ValidatedView());
        }
        if (this.stage === 'validate') {
            return this.stages.set(new ValidateView({parent: this}));
        }
        return this.stages.set(new RequestView({model: this.model}));
    }
});


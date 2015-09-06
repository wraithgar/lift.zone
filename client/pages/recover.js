var View = require('ampersand-view');
var app = require('ampersand-app');
var querystring = require('querystring');
var ViewSwitcher = require('ampersand-view-switcher');
var RequestView = require('../views/requestRecover');
var RecoverView = require('../views/recover');

module.exports = View.extend({
    template: require('../templates/pages/recover.jade'),
    session: {
        'code': 'string'
    },
    render: function () {
        var params = querystring.parse(window.location.search.slice('1'));
        this.renderWithTemplate(this);
        this.stages = new ViewSwitcher(this.queryByHook('stage'), {
            show: function (view) {
                $(view.el).foundation();
            }
        });
        if (params.code) {
            this.code = params.code;
            return this.stages.set(new RecoverView({parent: this}));
        } else {
            return this.stages.set(new RequestView());
        }
    }
});

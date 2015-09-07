var View = require('ampersand-view');
var Querystring = require('querystring');
var ViewSwitcher = require('ampersand-view-switcher');
var RequestView = require('../views/request-recover');
var RecoverView = require('../views/recover');

module.exports = View.extend({
    template: require('../templates/pages/recover.jade'),
    session: {
        'code': 'string'
    },
    render: function () {

        var params = Querystring.parse(window.location.search.slice('1'));
        this.renderWithTemplate(this);
        this.stages = new ViewSwitcher(this.queryByHook('stage'), {
            show: function (view) {

                $(view.el).foundation();
            }
        });
        if (params.code) {
            this.code = params.code;
            return this.stages.set(new RecoverView({ parent: this }));
        }
        return this.stages.set(new RequestView());
    }
});

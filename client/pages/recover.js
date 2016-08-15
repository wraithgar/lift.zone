'use strict';

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
        this.token = params.token && params.token.replace(/\s+/, '');
        this.renderWithTemplate(this);
        this.queryByHook('stage').innerHTML = ''; //This clears out the static content
        this.stages = new ViewSwitcher(this.queryByHook('stage'), {
            show: function (view) {

                $(view.el).foundation();
            }
        });
        if (this.token) {
            return this.stages.set(new RecoverView({ parent: this }));
        }
        return this.stages.set(new RequestView());
    }
});

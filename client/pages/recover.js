'use strict';

const View = require('ampersand-view');
const Querystring = require('querystring');
const ViewSwitcher = require('ampersand-view-switcher');
const RequestView = require('../views/request-recover');
const RecoverView = require('../views/recover');

module.exports = View.extend({
    template: require('../templates/pages/recover.jade'),
    session: {
        'code': 'string'
    },
    render: function () {

        //const params = Querystring.parse(window.location.search.slice('1'));
        const params = Querystring.parse(window.location.hash.split('?')[1]);
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

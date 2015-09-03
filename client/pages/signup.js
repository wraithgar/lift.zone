var View = require('ampersand-view');
var app = require('ampersand-app');
var querystring = require('querystring');

module.exports = View.extend({
    template: require('../templates/pages/signup.jade'),
    render: function () {
        var params = {};
        if (window.location.query) {
            params = querystring.parse(window.location.query.slice('1'));
        }
        this.renderWithTemplate({ invite: params.invite });
        //Check invite, enable/disable submit
    }
});

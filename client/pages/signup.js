var View = require('ampersand-view');
var app = require('ampersand-app');
var querystring = require('querystring');

module.exports = View.extend({
    template: require('../templates/pages/signup.jade'),
    render: function () {
        var params = querystring.parse(window.location.search.slice('1'));
        this.renderWithTemplate({ invite: params.invite });
        //Check invite, enable/disable submit
    }
});

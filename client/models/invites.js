'use strict';

var App = require('ampersand-app');
var Collection = require('ampersand-rest-collection');
var ApiMixin = require('./mixins/api-collection');
var InviteModel = require('./invite');

var InviteCollection = Collection.extend(ApiMixin, {
    url: function () {

        return App.apiUrl + '/user/invites';
    },
    model: InviteModel
});
module.exports = InviteCollection;

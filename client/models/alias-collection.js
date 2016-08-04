'use strict';

var Collection = require('ampersand-rest-collection');
var App = require('ampersand-app');
var AliasModel = require('./alias');

module.exports = Collection.extend({
    url: function () {

        return App.apiUrl + '/aliases';
    },
    model: AliasModel
});

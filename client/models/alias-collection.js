'use strict';

const Collection = require('ampersand-rest-collection');
const App = require('ampersand-app');
const AliasModel = require('./alias');

module.exports = Collection.extend({
    url: function () {

        return App.apiUrl + '/aliases';
    },
    model: AliasModel
});

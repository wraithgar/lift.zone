'use strict';

//Base mixin for models to interact w/ api
var App = require('ampersand-app');
var Model = require('ampersand-model');

module.exports = {
    ajaxConfig: function () {

        var headers = {};
        if (App.accessToken) {
            headers.Authorization = 'Bearer ' + App.accessToken;
        }
        return {
            headers: headers
        };
    },
    sync: function (event, model, options) {

        var error = options.error;
        options.error = function (resp) {

            //4xx errors that aren't 404
            //if (resp.statusCode > 400 && resp.statusCode !== 404 && resp.statusCode !== 409 && resp.statusCode < 500) {
            if (resp.statusCode === 401 || resp.statusCode === 403) {
                App.setAccessToken(undefined);
            }
            if (error) {
                error(model, resp, options);
            }
        };
        return Model.prototype.sync.apply(this, arguments);
    }
};

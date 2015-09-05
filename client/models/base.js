var Model = require('ampersand-model');
var app = require('ampersand-app');
var forEach = require('lodash.foreach');

//Authorized model that updates app accessToken if it's found to be invalid
module.exports = Model.extend({
    ajaxConfig: function () {
        var headers = {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json'
        };
        if (app.accessToken) {
            headers.Authorization = 'Bearer ' + app.accessToken
        }
        return {
            headers: headers
        };
    },
    parse: function (resp) {
        var data = resp.data;
        if (data.type !== this.type) {
            throw TypeError('Invalid type ' + data.type);
        }
        data.attributes[this.idAttribute] = data.id;
        return data.attributes;
    },
    toJSON: function () {
        return Model.prototype.serialize.apply(this, arguments);
    },
    serialize: function () {
        var data = {};
        data.attributes = this.getAttributes({props: true}, true);
        data.type = this.type;
        data.id = this[this.idAttribute];
        delete data.attributes[this.idAttribute];
        //TODO children and collections
        return {data: data}
    },
    sync: function (event, model, options) {
        var error = options.error;
        options.error = function (resp) {
            //4xx errors that aren't 404
            if (resp.statusCode > 399 && resp.statusCode !== 404 && resp.statusCode < 500) {
                app.setAccessToken(undefined);
            }
            if (error) { error(model, resp, options); }
        };
        return Model.prototype.sync.apply(this, arguments);
    }
});

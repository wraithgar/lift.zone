//Base mixin for models to interact w/ api
var App = require('ampersand-app');
var Model = require('ampersand-model');

module.exports = {
    ajaxConfig: function () {

        var headers = {
            'Content-Type': 'application/vnd.api+json'
        };
        if (App.accessToken) {
            headers.Authorization = 'Bearer ' + App.accessToken;
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
        data.attributes = this.getAttributes({ props: true }, true);
        data.type = this.type;
        data.id = this[this.idAttribute];
        delete data.attributes[this.idAttribute];
        //TODO children and collections
        return { data: data };
    },
    sync: function (event, model, options) {

        var error = options.error;
        var attrs = model.serialize();
        if (!options.attrs) {
            options.attrs = model.serialize();
        } else {
            attrs.data.attributes = options.attrs;
            options.attrs = attrs;
        }
        options.error = function (resp) {

            //4xx errors that aren't 404
            if (resp.statusCode > 400 && resp.statusCode !== 404 && resp.statusCode < 500) {
                App.setAccessToken(undefined);
            }
            if (error) { error(model, resp, options); }
        };
        return Model.prototype.sync.apply(this, arguments);
    }
};


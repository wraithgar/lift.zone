var Model = require('ampersand-model');
var app = require('ampersand-app');

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
        data.attributes.id = resp.id;
        return data.attributes;
    },
    serialize: function () {
        var data = {};
        data.attributes = this.getAttributes({props: true}, true);
        data.type = this.type;
        data.id = this.id;
        delete data.attributes.id;
        //TODO children and collections
        return {data: data}
    },
    sync: function (event, model, options) {
        var error = options.error;
        options.error = function (resp) {
            if (resp.statusCode === 401) {
                app.setAccessToken(undefined);
            }
            if (error) { error(model, resp, options); }
        };
        return Model.prototype.sync.apply(this, arguments);
    }
});

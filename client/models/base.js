var Model = require('ampersand-model');
var app = require('ampersand-app');

//Authorized model that updates app accessToken if it's found to be invalid
module.exports = Model.extend({
    ajaxConfig: function () {
        return {
            headers: {
                'Authorization': app.accessToken
            }
        };
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

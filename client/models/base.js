/*global app*/
var Model = require('ampersand-model');

module.exports = Model.extend({
    ajaxConfig: function () {
        return {
            headers: {
                'Authorization': app.accessToken
            }
        };
    }
});

var Model = require('ampersand-model');

module.exports = Model.extend({
    ajaxConfig: function () {
        return {
            xhrFields: {
                withCredentials: true
            }
        };
    }
});

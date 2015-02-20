/*global $*/
var View = require('ampersand-view');

//Base page to reup the foundation magic after rendering

module.exports = View.extend({
    render: function () {
        this.renderWithTemplate(this);
        $(this.el).foundation();
        return this;
    }
});

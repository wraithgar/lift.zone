var View = require('ampersand-view');
module.exports = View.extend({
    template: require('../templates/views/signup.jade'),
    render: function () {
        this.renderWithTemplate(this);
        $(this.el).foundation();
        return this;
    }
});


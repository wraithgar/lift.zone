'use strict';

var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/views/lift531.pug'),
    autoRender: true,
    render: function () {

        this.listenToAndRun(this.model, 'change:waves', this.reRender);
    },
    reRender: function () {

        this.renderWithTemplate(this.model);
    }
});

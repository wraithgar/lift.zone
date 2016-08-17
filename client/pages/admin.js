'use strict';
var View = require('ampersand-view');
var AdminUserView = require('../views/admin-user');

module.exports = View.extend({
    template: require('../templates/pages/admin.jade'),
    initialize: function () {

        this.collection.fetch();
    },
    render: function () {

        this.renderWithTemplate(this);
        this.renderCollection(this.collection, AdminUserView, this.queryByHook('users'));
        return this;
    }
});

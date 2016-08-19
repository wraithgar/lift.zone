'use strict';

var View = require('ampersand-view');
var App = require('ampersand-app');

module.exports = View.extend({
    template: require('../templates/pages/me.jade'),
    bindings: {
        'model.validated': {
            type: 'toggle',
            hook: 'validated'
        },
        'model.name': {
            type: 'attribute',
            name: 'value',
            selector: '[name=name]'
        },
        'model.email': {
            type: 'attribute',
            name: 'value',
            selector: '[name=email]'
        },
        'model.invalid': {
            type: 'toggle',
            hook: 'invalid'
        },
        'model.preferences.visible': {
            type: 'booleanAttribute',
            name: 'checked',
            selector: '[name=visible]'
        }
    },
    events: {
        'submit form': 'update'
    },
    render: function () {

        this.renderWithTemplate(this);
        $(this.el).foundation();
        return this;
    },
    update: function (e) {

        var self = this;
        e.preventDefault();
        App.view.message = '';
        var visible = self.query('[name=visible]').checked;
        var name = self.query('[name=name]').value;
        var email = self.query('[name=email]').value;
        var currentPassword = self.query('[name=currentPassword]').value;
        var newPassword = self.query('[name=newPassword]').value;
        var confirmPassword = self.query('[name=confirmPassword]').value;
        var attrs = {};
        if (visible !== self.model.preferences.visible) {
            attrs.preferences = Object.assign({}, self.model.preferences);
            attrs.preferences.visible = visible;
        }
        attrs.currentPassword = currentPassword;
        if (name !== self.model.name) {
            attrs.name = name;
        }
        if (email !== self.model.email) {
            attrs.email = email;
        }
        if (newPassword && confirmPassword) {
            attrs.newPassword = newPassword;
            attrs.confirmPassword = confirmPassword;
        }
        App.log('saving %j', attrs);
        if (Object.keys(attrs).length === 1) {
            App.view.message = 'You didn\'t change anything';
            return;
        }
        self.model.save(attrs, {
            patch: true,
            success: function () {

                App.view.message = 'Saved your new info';
                self.query('[name=currentPassword]').value = '';
                self.query('[name=newPassword]').value = '';
                self.query('[name=currentPassword]').value = '';
            },
            error: function () {

                App.view.message = 'There was an error saving your info!';
            }
        });
    }
});

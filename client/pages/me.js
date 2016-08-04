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
        }
    },
    events: {
        'submit form': 'update'
    },
    render: function () {

        this.renderWithTemplate(this);
        return this;
    },
    update: function (e) {

        e.preventDefault();
        App.view.message = '';
        var name = this.query('[name=name]').value;
        var email = this.query('[name=email]').value;
        var password = this.query('[name=password]').value;
        var passwordConfirm = this.query('[name=passwordConfirm]').value;
        var attrs = {};
        if (name !== this.model.name) {
            attrs.name = name;
        }
        if (email !== this.model.email) {
            attrs.email = email;
        }
        if (password && passwordConfirm) {
            attrs.password = password;
            attrs.passwordConfirm = passwordConfirm;
        }
        App.log('saving %j', attrs);
        if (Object.keys(attrs).length === 0) {
            App.view.message = 'You didn\'t change anything';
            return;
        }
        this.model.save(attrs, {
            patch: true,
            success: function () {

                App.me.password = undefined;
                App.me.passwordConfirm = undefined;
                App.view.message = 'Saved your new info';
            },
            error: function () {

                App.view.message = 'There was an error saving your info!';
            }
        });
    }
});

var View = require('ampersand-view');
var app = require('ampersand-app');

module.exports = View.extend({
    template: require('../templates/pages/me.jade'),
    bindings: {
        'model.validated': {
            type: 'toggle',
            hook: 'validated'
        },
        'model.login': {
            type: 'text',
            hook: 'login'
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
        app.view.message = '';
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
        app.log('saving %j', attrs);
        if (Object.keys(attrs).length === 0) {
            app.view.message = 'You didn\'t change anything';
            return;
        }
        this.model.save(attrs, {
            patch: true,
            success: function () {
                //app.me.password = undefined;
                //app.me.passwordConfirm = undefined;
                app.view.message = 'Saved your new info';
            },
            error: function () {
                app.view.message = 'There was an unknown error saving your info!';
            }
        });
    }
});

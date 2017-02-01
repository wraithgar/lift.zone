'use strict';

var App = require('ampersand-app');
var View = require('ampersand-view');
var Sync = require('ampersand-sync');

var AliasView = View.extend({
    template: require('../templates/views/user-alias.pug'),
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        }
    },
    events: {
        'click [data-hook=promote]': 'promote'
    },
    promote: function () {

        var self = this;

        var oldActivity = self.model.collection.parent;
        var activities = self.model.collection.parent.collection;

        var syncOptions = {
            headers: {
                Authorization: 'Bearer ' + App.accessToken
            },
            url: self.model.url() + '/promote',
            success: function (response) {

                activities.remove(oldActivity);
                activities.add(response);
            },
            error: function (err) {

                if (err.statusCode === 409) {
                    $(self.queryByHook('taken')).foundation('reveal', 'open');
                }
                else {
                    $(self.queryByHook('error')).foundation('reveal', 'open');
                }
            }
        };
        Sync('update', null, syncOptions);
    }
});

var ActivityView = View.extend({
    template: require('../templates/views/user-activity.pug'),
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        }
    },
    events: {
        'submit form[data-hook=alias-form]': 'addAlias'
    },
    render: function () {

        this.renderWithTemplate(this);
        $(this.el).foundation();
        this.renderCollection(this.model.aliases, AliasView, this.queryByHook('aliases'));
    },
    addAlias: function (e) {

        e.preventDefault();
        App.view.message = '';
        var self = this;
        var name = self.query('[name=alias]').value;
        var alias = new self.model.aliases.model({ name: name, activity_id: this.model.id });
        alias.save(null, {

            success: function () {

                self.model.aliases.add(alias);
                self.query('[name=alias]').value = '';
            },
            error: function (model, newAlias, ctx) {

                if (ctx.xhr.status === 409) {
                    $(self.queryByHook('alias-exists')).foundation('reveal', 'open');
                }
                else {
                    App.view.message = 'Unknown error trying to save alias';
                }
            }
        });
    }
});

module.exports = ActivityView;

'use strict';

var Model = require('./base');
var Sets = require('./sets');
var Suggestions = require('./suggestions');
var app = require('ampersand-app');

module.exports = Model.extend({
    urlRoot: function () { return app.apiUrl + '/activities'; },
    initialize: function (props) {
        var self = this;
        if (props) {
            self.fetch({
                url: app.apiUrl + '/search/activities/' + self.name,
                error: function () {
                    //TODO when model sends proper xhr back check for 404 only
                    self.fetch({
                        url: app.apiUrl + '/suggestions/activities/' + self.name
                    });
                }
            });
        }
    },
    props: {
        id: 'number',
        name: ['string', true],
        aliasID: 'number',
        alias: 'string'
    },
    collections: {
        sets: Sets,
        suggestions: Suggestions
    },
    session: {
        comment: 'string'
    },
    derived: {
        displayName: {
            deps: ['name', 'alias'],
            fn: function () {
                return this.alias || this.name;
            }
        },
        hasComment: {
            deps: ['comment'],
            fn: function () {
                if (this.comment) {
                    return true;
                }
                return false;
            }
        },
        ready: {
            deps: ['id'],
            fn: function () {
                return !this.isNew();
            }
        }
    }
});

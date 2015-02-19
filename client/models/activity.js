'use strict';

var Model = require('./base');
var Sets = require('./sets');
var app = require('ampersand-app');

module.exports = Model.extend({
    urlRoot: function () { return app.apiUrl + '/activities'; },
    initialize: function (props) {
        if (props) {
            this.fetch({
                url: app.apiUrl + '/search/activities/' + this.name
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
        sets: Sets
    },
    session: {
        comment: 'string',
        suggestions: ['array', true, function () { return []; }]
    },
    derived: {
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

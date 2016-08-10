'use strict';

//Mixin for activity model props, etc
var Sets = require('../sets');
var Suggestions = require('../suggestions');

module.exports = {
    props: {
        id: 'string',
        activity_id: 'string',
        alias: 'string',
        comment: 'string',
        name: ['string', true]
    },
    collections: {
        sets: Sets,
        suggestions: Suggestions
    },
    session: {
        hasSuggestions: 'boolean'
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
};

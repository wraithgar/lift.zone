var Model = require('ampersand-model');
var Sets = require('./set-collection');
var Suggestions = require('./suggestion-collection');

module.exports = Model.extend({
    props: {
        id: 'number',
        name: ['string', true],
        aliasId: 'number',
        alias: 'string'
    },
    collections: {
        sets: Sets,
        suggestions: Suggestions
    },
    session: {
        comment: 'string',
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
});


'use strict';

//Mixin for activity model props, etc
const Sets = require('../set-collection');
const Suggestions = require('../suggestion-collection');

module.exports = {
    props: {
        id: 'number',
        useractivityId: 'number',
        name: ['string', true],
        aliasFor: 'object'
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

                console.log(this);
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

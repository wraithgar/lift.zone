'use strict';

var Collection = require('ampersand-collection');
var Model = require('ampersand-state');

var SuggestionModel = Model.extend({
    props: {
        id: 'string',
        activity_id: 'string',
        name: 'string',
        rank: 'number'
    }
});

var SuggestionCollection = Collection.extend({
    model: SuggestionModel,
    comparator: 'rank'
});

module.exports = SuggestionCollection;

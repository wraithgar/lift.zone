'use strict';

var Model = require('ampersand-state');

module.exports = Model.extend({
    props: {
        id: 'string',
        activity_id: 'string',
        name: 'string',
        rank: 'number'
    }
});

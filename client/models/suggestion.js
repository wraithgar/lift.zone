'use strict';

const Model = require('ampersand-state');

module.exports = Model.extend({
    props: {
        id: 'number',
        name: 'string'
    }
});

'use strict';

const Model = require('ampersand-model');
const Activity = require('./mixins/activity');

module.exports = Model.extend(Activity);

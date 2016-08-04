'use strict';

var Model = require('ampersand-model');
var Activity = require('./mixins/activity');

module.exports = Model.extend(Activity);

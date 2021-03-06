'use strict';

var Model = require('ampersand-state');
var Collection = require('ampersand-collection');

var SetModel = Model.extend({
    props: {
        'weight': 'number',
        'reps': 'number',
        'time': 'number',
        'distance': 'number',
        'unit': 'string',
        'pr': ['boolean', true, false]
    },
    derived: {
        formattedFull: {
            deps: ['distance', 'weight', 'reps', 'unit'],
            fn: function formattedFull() {

                var formatted = [];
                if (this.time) {
                    formatted.push(this.formattedTime);
                }
                if (this.time && this.distance) {
                    formatted.push('|');
                }
                if (this.distance) {
                    formatted.push(this.distance);
                    formatted.push(this.unit);
                }
                if (this.weight) {
                    formatted.push(this.weight);
                    formatted.push(this.unit);
                }
                if (this.weight && this.reps) {
                    formatted.push('x');
                }
                if (this.reps) {
                    formatted.push(this.reps);
                    if (this.reps === 1) {
                        formatted.push('rep');
                    }
                    else {
                        formatted.push('reps');
                    }
                }
                return formatted.join(' ');
            }
        },
        formattedShort: {
            deps: ['distance', 'weight', 'reps', 'unit'],
            fn: function formattedShort() {

                var formatted = [];
                if (this.time) {
                    formatted.push(this.formattedTime);
                }
                if (this.time && this.distance) {
                    formatted.push('|');
                }
                if (this.distance) {
                    formatted.push(this.distance);
                    formatted.push(' ');
                    if (this.unit === 'miles') {
                        formatted.push('mi');
                    }
                    else {
                        formatted.push('km');
                    }
                }
                if (this.weight) {
                    formatted.push(this.weight);
                }
                if (this.weight && this.reps) {
                    formatted.push('x');
                }
                if (this.reps) {
                    formatted.push(this.reps);
                }
                return formatted.join('');
            }
        },
        formattedTime: {
            deps: ['time'],
            fn: function () {

                var segments = [];
                var segment = this.time % 60;
                if (segment === 0) {
                    segment = '00';
                }
                segments.unshift(segment);
                if (this.time > 60) {
                    segment = (this.time - this.time % 60) % 3600 / 60;
                    if (segment === 0) {
                        segment = '00';
                    }
                    segments.unshift(segment);
                    if (this.time > 3600) {
                        segment = (this.time - this.time % 3600) / 3600;
                        if (segment === 0) {
                            segment = '00';
                        }
                        segments.unshift(segment);
                    }
                }
                return segments.join(':');
            }
        }
    }
});

var SetCollection = Collection.extend({
    model: SetModel
});

module.exports = SetCollection;

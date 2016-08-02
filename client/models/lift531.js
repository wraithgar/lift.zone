'use strict';

const Model = require('ampersand-state');
const WendlerCals = require('../lib/wendler-calc');

module.exports = Model.extend({
    props: {
        name: 'string',
        weight: 'number',
        reps: 'number',
        extra: 'number'
    },
    derived: {
        ready: {
            deps: ['weight', 'reps'],
            fn: function () {

                return (this.weight > 0 && this.reps > 0);
            }
        },
        calculated: {
            deps: ['weight', 'reps'],
            fn: function () {

                if (this.weight > 0 && this.reps > 0) {
                    return ( (this.weight * this.reps / 30) + this.weight );
                }
            }
        },
        training: {
            deps: ['calculated', 'extra'],
            fn: function () {

                const calc = this.calculated; //If we reference it directly we get NaN somehow?
                if (calc !== undefined) {
                    calc = calc * 0.9;
                    if (this.extra > 0) {
                        calc = calc + this.extra;
                    }
                }
                return calc;
            }
        },
        warmup1: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.warmup1(this.training);
                }
            }
        },
        warmup2: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.warmup2(this.training);
                }
            }
        },
        warmup3: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.warmup3(this.training);
                }
            }
        },
        wave1Set1: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.wave1Set1(this.training);
                }
            }
        },
        wave1Set2: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.wave1Set2(this.training);
                }
            }
        },
        wave1Set3: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.wave1Set3(this.training);
                }
            }
        },
        wave2Set1: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.wave2Set1(this.training);
                }
            }
        },
        wave2Set2: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.wave2Set2(this.training);
                }
            }
        },
        wave2Set3: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.wave2Set3(this.training);
                }
            }
        },
        wave3Set1: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.wave3Set1(this.training);
                }
            }
        },
        wave3Set2: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.wave3Set2(this.training);
                }
            }
        },
        wave3Set3: {
            deps: ['training'],
            fn: function () {

                if (this.training > 0) {
                    return WendlerCals.wave3Set3(this.training);
                }
            }
        }
    }
});

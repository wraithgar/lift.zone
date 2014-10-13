var Model = require('ampersand-state');
var calc = require('../lib/wendlerCalc');

module.exports = Model.extend({
    props: {
        name: 'string',
        weight: 'number',
        reps: 'number',
        extra: 'number',
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
                var calc = this.calculated; //If we reference it directly we get NaN somehow?
                if (calc !== undefined) {
                    calc = calc * 0.9;
                    if (this.extra > 0) {
                        calc = calc + this.extra;
                    }
                }
                return calc;
            }
        },
        warmup_1: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.warmup_1(this.training);
                }
            }
        },
        warmup_2: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.warmup_2(this.training);
                }
            }
        },
        warmup_3: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.warmup_3(this.training);
                }
            }
        },
        wave1_1: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.wave1_1(this.training);
                }
            }
        },
        wave1_2: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.wave1_2(this.training);
                }
            }
        },
        wave1_3: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.wave1_3(this.training);
                }
            }
        },
        wave2_1: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.wave2_1(this.training);
                }
            }
        },
        wave2_2: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.wave2_2(this.training);
                }
            }
        },
        wave2_3: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.wave2_3(this.training);
                }
            }
        },
        wave3_1: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.wave3_1(this.training);
                }
            }
        },
        wave3_2: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.wave3_2(this.training);
                }
            }
        },
        wave3_3: {
            deps: ['training'],
            fn: function () {
                if (this.training > 0) {
                    return calc.wave3_3(this.training);
                }
            }
        }
    }
});

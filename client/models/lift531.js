'use strict';

var Model = require('ampersand-state');

var multipliers = [
    [0.4, 0.5, 0.6], //Warmup
    [0.65, 0.75, 0.85], //Wave 1
    [0.7, 0.8, 0.9], //Wave 2
    [0.75, 0.85, 0.95] //Wave 3
];

var nearest = function (weight) {
    return (5 * Math.round(weight / 5));
};

//Warmup is wave 0
//Sets start at 1
var calc = function (wave, set, weight) {
    var multiplier = multipliers[wave][set];
    if (weight > 0) {
        return String(nearest(weight * multiplier)) + ' lb';
    }
};

//We should just re-render whenever it changes then we could
//keep these in an array/object
module.exports = Model.extend({
    props: {
        name: 'string',
        weight: 'number',
        reps: 'number',
        extra: 'number',
        goal: 'number'
    },
    derived: {
        //Whether or not this is ready to render
        ready: {
            deps: ['weight', 'reps'],
            fn: function () {

                return (this.weight > 0 && this.reps > 0);
            }
        },
        //Theoretical one rep max
        calculated: {
            deps: ['weight', 'reps'],
            fn: function () {

                if (this.weight > 0 && this.reps > 0) {
                    return ( (this.weight * this.reps / 30) + this.weight );
                }
            }
        },
        //Training one rep max
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
        waves: {
            deps: ['training'],
            fn: function () {
                return [[
                    //Warmups
                    calc(0, 0, this.training),
                    calc(0, 1, this.training),
                    calc(0, 2, this.training)
                ], [
                    //Wave 1
                    calc(1, 0, this.training),
                    calc(1, 1, this.training),
                    calc(1, 2, this.training)
                ], [
                    //Wave 2
                    calc(2, 0, this.training),
                    calc(2, 1, this.training),
                    calc(2, 2, this.training)
                ], [
                    //Wave 3
                    calc(3, 0, this.training),
                    calc(3, 1, this.training),
                    calc(3, 2, this.training)
                ]];
            }
        }
    }
});

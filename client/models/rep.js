var Model = require('ampersand-state');

module.exports = Model.extend({
    props: {
        'weight': 'number',
        'reps': 'number',
        'unit': {
            type: 'string',
            values: ['lb', 'kg']
        }
    },
    derived: {
        formatted: {
            deps: ['weight', 'reps', 'unit'],
            fn: function () {
                var formatted = [];
                if (this.weight && this.reps) {
                    formatted.push('x');
                }
                if (this.weight) {
                    formatted.unshift(this.unit);
                    formatted.unshift(this.weight);
                }
                if (this.reps) {
                    formatted.push(this.reps);
                    formatted.push('reps');
                }
                return formatted.join(' ');
            }
        }
    }
});


var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/views/lift531.jade'),
    autoRender: true,
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        },
        'model.warmup_1': {
            type: 'text',
            hook: 'warmup_1'
        },
        'model.warmup_2': {
            type: 'text',
            hook: 'warmup_2'
        },
        'model.warmup_3': {
            type: 'text',
            hook: 'warmup_3'
        },
        'model.wave1_1': {
            type: 'text',
            hook: 'wave1_1'
        },
        'model.wave1_2': {
            type: 'text',
            hook: 'wave1_2'
        },
        'model.wave1_3': {
            type: 'text',
            hook: 'wave1_3'
        },
        'model.wave2_1': {
            type: 'text',
            hook: 'wave2_1'
        },
        'model.wave2_2': {
            type: 'text',
            hook: 'wave2_2'
        },
        'model.wave2_3': {
            type: 'text',
            hook: 'wave2_3'
        },
        'model.wave3_1': {
            type: 'text',
            hook: 'wave3_1'
        },
        'model.wave3_2': {
            type: 'text',
            hook: 'wave3_2'
        },
        'model.wave3_3': {
            type: 'text',
            hook: 'wave3_3'
        }
    }
});


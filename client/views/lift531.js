var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/views/lift531.jade'),
    autoRender: true,
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        },
        'model.warmup1': {
            type: 'text',
            hook: 'warmup1'
        },
        'model.warmup2': {
            type: 'text',
            hook: 'warmup2'
        },
        'model.warmup3': {
            type: 'text',
            hook: 'warmup3'
        },
        'model.wave1Set1': {
            type: 'text',
            hook: 'wave1-set1'
        },
        'model.wave1Set2': {
            type: 'text',
            hook: 'wave1-set2'
        },
        'model.wave1Set3': {
            type: 'text',
            hook: 'wave1-set3'
        },
        'model.wave2Set1': {
            type: 'text',
            hook: 'wave2-set1'
        },
        'model.wave2Set2': {
            type: 'text',
            hook: 'wave2-set2'
        },
        'model.wave2Set3': {
            type: 'text',
            hook: 'wave2-set3'
        },
        'model.wave3Set1': {
            type: 'text',
            hook: 'wave3-set1'
        },
        'model.wave3Set2': {
            type: 'text',
            hook: 'wave3-set2'
        },
        'model.wave3Set3': {
            type: 'text',
            hook: 'wave3-set3'
        }
    }
});

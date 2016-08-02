'use strict';

const View = require('ampersand-view');
const GroupedCollectionView = require('ampersand-grouped-collection-view');

const RepItemView = View.extend({
    template: require('../templates/views/bbcode-rep-item.jade'),
    bindings: {
        'model.formattedShort': {
            type: 'text',
            hook: 'rep'
        },
        'model.nonpr': {
            type: 'booleanClass',
            name: 'nonpr',
            hook: 'pr'
        }
    }
});

const RepGroupView = View.extend({
    template: require('../templates/views/bbcode-rep-group.jade'),
    render: function () {

        this.renderWithTemplate();
        this.cacheElements({
            groupEl: '[data-hook=repGroup]'
        });
    }
});


module.exports = View.extend({
    template: require('../templates/views/bbcode.jade'),
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        },
        'model.comment': {
            type: 'text',
            hook: 'comment'
        },
        'model.hasComment': {
            type: 'toggle',
            hook: 'commentLabel'
        }
    },
    render: function () {

        this.renderWithTemplate();
        const repView = new GroupedCollectionView({
            collection: this.model.sets,
            itemView: RepItemView,
            groupView: RepGroupView,
            groupsWith: function (model) {

                if (model.collection.length < 6) {
                    return true;
                }
                return (model.collection.indexOf(model) % 3) !== 0;
            },
            prepareGroup: function (model) {

                return model;
            }
        });
        repView.render();
        this.renderSubview(repView, this.queryByHook('sets'));
    }
});

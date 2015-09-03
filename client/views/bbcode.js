var View = require('ampersand-view');
var GroupedCollectionView = require('ampersand-grouped-collection-view');

var RepItemView = View.extend({
    template: require('../templates/views/bbcodeRepItem.jade'),
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

var RepGroupView = View.extend({
    template: require('../templates/views/bbcodeRepGroup.jade'),
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
        var repView = new GroupedCollectionView({
            collection: this.model.sets,
            itemView: RepItemView,
            groupView: RepGroupView,
            groupsWith: function (model) {
                if (model.collection.length < 6) {
                    return true;
                } else {
                    return (model.collection.indexOf(model) % 3) !== 0;
                }
            },
            prepareGroup: function () {
                return;
            }
        });
        this.renderSubview(repView, this.queryByHook('sets'));
    }
});

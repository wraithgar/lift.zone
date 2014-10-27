var View = require('ampersand-view');
var GroupedCollectionView = require('ampersand-grouped-collection-view');
var templates = require('../templates');

var RepItemView = View.extend({
    template: templates.includes.bbcodeRepItem,
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
    template: templates.includes.bbcodeRepGroup,
    render: function () {
        this.renderWithTemplate();
        this.cacheElements({
            groupEl: '[data-hook=repGroup]'
        });
    }
});


module.exports = View.extend({
    template: templates.includes.bbcode,
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        }
    },
    render: function () {
        this.renderWithTemplate();
        var repView = new GroupedCollectionView({
            collection: this.model.reps,
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

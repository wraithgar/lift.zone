'use strict';

var View = require('ampersand-view');
var GroupedCollectionView = require('ampersand-grouped-collection-view');

var RepView = View.extend({
    template: require('../templates/views/bbcode-rep-short.jade'),
    bindings: {
        'model.formattedShort': {
            type: 'text',
            hook: 'rep'
        },
        'model.pr': {
            type: 'toggle',
            hook: 'pr'
        },
        'model.lastInGroup': {
            type: 'toggle',
            hook: 'repsep',
            invert: true
        }
    }
});

var SetGroupView = View.extend({
    template: require('../templates/views/bbcode-set-group.jade'),
    render: function () {

        this.renderWithTemplate();
        this.cacheElements({
            groupEl: '[data-hook=set-group]'
        });
    }
});

module.exports = View.extend({
    template: require('../templates/views/bbcode-activity.jade'),
    bindings: {
        'model.displayName': {
            type: 'text',
            hook: 'name'
        },
        'model.comment': {
            type: 'text',
            hook: 'comment'
        },
        'model.hasComment': {
            type: 'toggle',
            hook: 'comment-label'
        }
    },
    render: function () {

        if (this.model.sets.length > 0) {
            this.model.sets.at(this.model.sets.length - 1).lastInGroup = true;
        }
        this.renderWithTemplate();
        var setView = new GroupedCollectionView({
            collection: this.model.sets,
            itemView: RepView,
            groupView: SetGroupView,
            groupsWith: function (model, prevModel) {

                return (model.collection.indexOf(model) % 3) !== 0;
            },
            prepareGroup: function (model, prevGroupModel) {

                var lastInGroup = model.collection.indexOf(model) + 2;
                if (lastInGroup < model.collection.length) {
                    model.collection.at(lastInGroup).lastInGroup = true;
                }
                return model;
            }
        });
        setView.render();
        this.renderSubview(setView, this.queryByHook('sets'));
    }
});

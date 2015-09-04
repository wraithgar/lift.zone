var View = require('ampersand-view');
var SetView = require('./set');
var SuggestionView = require('./suggestion');

module.exports = View.extend({
    template: require('../templates/views/activity.jade'),
    bindings: {
        'model.displayName': {
            type: 'text',
            hook: 'activityName'
        },
        'model.comment': [{
            type: 'text',
            hook: 'activityComment'
        }, {
            type: 'toggle',
            hook: 'activityComment'
        }],
        'model.ready': {
            type: 'toggle',
            no: '[data-hook=newActivity]'
        },
        'model.hasSuggestions': {
            type: 'toggle',
            hook: 'hasSuggestions'
        }
    },
    events: {
        'click [data-hook=new]': 'findAlias',
        'click [data-hook=name]': 'selfAlias'
    },
    render: function () {
        this.renderWithTemplate();
        this.renderSubview(new SuggestionView({model: this.model}), this.queryByHook('newActivity'));
        this.renderCollection(this.model.sets, SetView, this.queryByHook('sets'));
        this.renderCollection(this.model.suggestions, SuggestionView, this.queryByHook('suggestions'));
        this.cacheElements({aliasModal: '[data-hook=chooseAlias]'});
        return this;
    },
    findAlias: function () {
        $(this.aliasModal).foundation('reveal', 'open');
    },
    selfAlias: function () {
        console.log('choosing self alias');
    },
    closeModal: function () {
        app.$(this.aliasModal).foundation('reveal', 'close');
    }
});

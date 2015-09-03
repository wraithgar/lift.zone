var View = require('ampersand-view');

module.exports = View.extend({
    autoRender: true,
    template: require('../templates/views/suggestion.jade'),
    events: {
        'click a': 'chooseAlias'
    },
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        }
    },
    chooseAlias: function () {
        var self = this;
        if (this.model.suggestions) {
            this.model.save(
                {aliasId: this.model.id, alias: this.model.name},
                {success: function () {
                    self.parent.closeModal();
                }}
            );
        } else {
            this.model.collection.parent.save(
                {aliasId: this.model.id, alias: this.model.name},
                {success: function () {
                    self.parent.parent.closeModal();
                }}
            );
        }
    }
});

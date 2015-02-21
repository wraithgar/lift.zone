var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    autoRender: true,
    template: templates.includes.suggestion,
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

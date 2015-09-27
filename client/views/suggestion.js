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
            console.log('I meant what I typed');
            this.model.save({
                name: this.model.name
            }, {
                success: function () {

                    self.parent.closeModal();
                }
            });
        } else {
            console.log('I really meant', this.model.toJSON());
            this.model.collection.parent.save({
                name: this.model.collection.parent.name,
                useractivityId: this.model.id
            }, {
                success: function () {

                    self.parent.closeModal();
                }
            });
        }
    }
});

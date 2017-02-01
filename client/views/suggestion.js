'use strict';

var View = require('ampersand-view');

module.exports = View.extend({
    autoRender: true,
    template: require('../templates/views/suggestion.pug'),
    events: {
        'click [data-hook=name]': 'chooseAlias'
    },
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        }
    },
    chooseAlias: function (e) {

        e.preventDefault();
        var self = this;
        if (this.model.suggestions) {
            this.model.save({
                name: this.model.name
            }, {
                success: function () {

                    self.parent.closeModal();
                }
            });
        }
        else {
            this.model.collection.parent.save({
                name: this.model.collection.parent.name,
                activity_id: this.model.activity_id
            }, {
                success: function () {

                    self.parent.closeModal();
                }
            });
        }
    }
});

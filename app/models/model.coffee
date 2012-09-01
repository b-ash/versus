Backbone = this.Backbone or require('../../vendor/scripts/backbone')


# Base class for all models.
module.exports = class Model extends Backbone.Model

    close: =>
        @unbind()
        @onClose?()

Backbone = this.Backbone or require('../../vendor/scripts/backbone')

class Battle extends Backbone.Model
    url: 'api/v1/create/'

    defaults: ->
        name: 'Unknown'
        contenders: []
        winner: 'Unknown'
        explanations:
            bash: 'Not disclosed'
            jay: 'Not disclosed'

    close: =>
        @unbind()
        @onClose?()


module.exports = Battle

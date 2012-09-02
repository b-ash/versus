Model = require './model'

class Battle extends Model
    url: 'api/v1/create/'

    defaults: ->
        name: 'Unknown'
        contenders: []
        winner: 'Unknown'
        explanations:
            bash: 'Not disclosed'
            jay: 'Not disclosed'

    initialize: (args) =>
        console.log args


module.exports = Battle

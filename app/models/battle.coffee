Model = require './model'

class Battle extends Model
    defaults: ->
        name: 'Unknown'
        criteria: []


module.exports = Battle

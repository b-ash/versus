Collection = require './collection'
Battle = require '../models/battle'


class Battles extends Collection
    baseUrl: 'battle/'
    model: Battle

    initialize: =>
        @url = "#{@baseUrl}#{@battle}"


module.exports = Battles

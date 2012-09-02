Collection = require './collection'
Battle = require '../models/battle'


class Battles extends Collection
    url: 'api/v1/battles/'
    model: Battle


module.exports = Battles

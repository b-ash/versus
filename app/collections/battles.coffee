Battle = require '../models/battle'


class Battles extends Backbone.Collection
    url: 'api/v1/battles/'
    model: Battle


module.exports = Battles

Battle = require '../models/battle'
battlesData = require '../lib/battles_data'


class Battles extends Backbone.Collection

    model: Battle

    fetch: (options) =>
      @reset @parse battlesData
      options.success()
      @


module.exports = Battles

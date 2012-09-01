app = require 'application'
utils = require 'lib/utils'

IndexView = require 'views/index'


module.exports = class Router extends Backbone.Router
    routes:
        '': 'index'

    index: =>
        @indexView = new IndexView()

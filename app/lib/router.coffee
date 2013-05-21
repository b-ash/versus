app = require 'application'
IndexView = require 'views/index'


module.exports = class Router extends Backbone.Router
    routes:
        '*route': 'index'

    index: =>
        app.views.indexView = new IndexView()

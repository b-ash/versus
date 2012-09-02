app = require 'application'
utils = require 'lib/utils'

IndexView = require 'views/index'
CreateView = require 'views/create'


module.exports = class Router extends Backbone.Router
    routes:
        '': 'index'
        'create': 'create'

    index: =>
        @_closeViews()
        app.views.indexView = new IndexView()

    create: =>
        @_closeViews()
        app.views.createView = new CreateView()

    _closeViews: =>
        for key, view of app.views 
            delete app.views[key]
            view.close()
        @

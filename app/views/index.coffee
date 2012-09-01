View = require './view'

class IndexView extends View
    el: '.main-page'
    template: require './templates/index'

    initialize: =>
        @render()


module.exports = IndexView

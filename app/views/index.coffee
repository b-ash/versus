View = require './view'

class IndexView extends View
    el: '.main-page'
    template: require './templates/index'

    initialize: =>
        @render()

    afterRender: =>
        $('#header').scrollPanel
            topPadding: -109
            change: (type, $el) ->
                if type is 'fixed'
                    $el.addClass 'floating'
                else
                    $el.removeClass 'floating'

        $('#header-graphic').scrollPanel
            topPadding: -109
            change: (type, $el) ->
                if type is 'fixed'
                    $el.addClass 'floating'
                else
                    $el.removeClass 'floating'


module.exports = IndexView

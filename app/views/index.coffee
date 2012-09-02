View = require './view'
Battles = require '../collections/battles'

class IndexView extends View
    el: '.main-page'
    views: []
    template: require './templates/index'

    initialize: =>
        @collection = new Battles()
        @collection.fetch 
            success: (data, textstatus, xhr) =>
                console.log 'Shit worked'
                console.log data
                @render()
            error: ->
                console.log 'Something happened fetching battles'

    afterRender: =>
        @initScrollers()
        @initBattles
            success: @initBattles

    initScrollers: =>
        @$('#header').scrollPanel
            topPadding: -109
            change: (type, $el) ->
                if type is 'fixed'
                    $el.addClass 'floating'
                else
                    $el.removeClass 'floating'

        @$('#header-graphic').scrollPanel
            topPadding: -109
            change: (type, $el) ->
                if type is 'fixed'
                    $el.addClass 'floating'
                else
                    $el.removeClass 'floating'

    initBattles: (args) =>
        @collection.each (battle) =>
            console.log @collection.toJSON()
            view = new BattleView {model: battle}
            app.views.indexView.views.push view
            view.render()
        @


class BattleView extends View
    tagName: 'li'
    tagClass: 'battle'
    template: require './templates/battles/pizza'

    getRenderData: =>
        return @model.toJSON()


module.exports = IndexView

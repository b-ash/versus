View = require './view'
Battles = require '../collections/battles'

app = window.app

class IndexView extends View
    el: '.main-page'
    views: []
    template: require './templates/index'
    events:
        'click #about'   : 'toggleAbout'
        'click #contact' : 'toggleContact'

    initialize: =>
        @collection = new Battles()
        @collection.fetch {success: @render}

    afterRender: =>
        @initEls().initScrollers().initBattles {success: @initBattles}

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
        @

    initBattles: (args) =>
        @collection.each (battle) =>
            view = new BattleView {model: battle}
            @views.push view
            @$('#list').append view.render().el
            view.trigger 'slider'
        @

    initEls: =>
        @$about = @$ '#about-panel'
        @$aboutLink = @$ '#about'
        @$contact = @$ '#contact-panel'
        @$contactLink = @$ '#contact'
        @

    toggleAbout: (event) =>
        event.preventDefault()
        @_toggle @$about, @$contact, @$aboutLink, @$contactLink, 800

    toggleContact: (event) =>
        event.preventDefault()
        @_toggle @$contact, @$about, @$contactLink, @$aboutLink, 350

    _toggle: ($el, $other, $elLink, $otherLink, speed) =>
        if $el.is(':visible')
            $elLink.removeClass 'selected'
            $el.slideUp speed
        else
            $elLink.addClass 'selected'
            $el.slideDown speed

        if $other.is(':visible')
            $otherLink.removeClass 'selected'
            $other.slideUp 350
        @


class BattleView extends View
    tagName: 'li'
    tagClass: 'battle'
    template: require './templates/battle'

    initialize: =>
        @on 'slider', @initSlider

    getRenderData: =>
        @model.toJSON()

    initSlider: =>
        @$('.deep-dish-pizza').scrollPanel
            topPadding: -39
            change: (type, $el) ->
                if type is 'fixed'
                    $el.addClass 'floating'
                else
                    $el.removeClass 'floating'

    afterRender: =>
        $picTables = @$ '.battle-pictures-wrap table'
        $pics = $picTables.find '.pic'
        $pics.find('img').hover(() -> # hover in
            $el = $ this
            $el.parent().css 'z-index', 1
            $el.animate {height: 325, width: 325, left: '-=50', top: '-=50'}, 'fast'
        , () -> # hover out
            $el = $ this
            $el.animate {height: 225, width: 225, left: '+=50', top: '+=50'}, 'fast', ->
                $el.parent().css 'z-index', 0
        )

        $pics.each (index, el) ->
            $el = $ el
            setTimeout () ->
                pos = $el.position()
                $el.css {position: 'absolute', left: pos.left, top: pos.top}
            , 500


module.exports = IndexView

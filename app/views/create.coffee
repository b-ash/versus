app = require 'application'
View = require './view'
Battle = require 'models/battle'

class CreateView extends View
    el: '.main-page'
    template: require './templates/create'
    events: 
        'click #create' : 'create'

    initialize: =>
        @render()

    afterRender: =>
        @$('#config').text """{
            "name": "<BATTLE NAME>",
            "criteria": [
                {"<CRITERIA NAME>": "<DESCRIPTION OF CRITERIA>"}
            ],
            "contenders": [
                {
                    "name": "<CONTENDER NAME>",
                    "criteria": [
                        {"<CRITERIA NAME>": <RATING>}
                    ]
                }
            ],
            "winner": "<WINNER NAME>",
            "explanation": [
                {"bash": "<EXPLANATION>"},
                {"jay": "<EXPLANATION>"}
            ]
        }
        """

    create: (event) =>
        event.preventDefault()
        event.stopPropagation()

        json = JSON.parse @$('#config').val()
        battle = new Battle()
        console.log battle
        battle.save json, {
            success: =>
                @$('#error').hide()
                @$('#success').slideDown 500
            error: =>
                @$('#error').slideDown 500
                @$('#success').hide()
        }


module.exports = CreateView

mongo = require 'mongodb'
Server = mongo.Server 
Db = mongo.Db 
ObjectId = mongo.BSONPure.ObjectID

env = require './env'


class Api
    init: (app) =>
        console.log "Connecting to mongo with #{JSON.stringify env}"

        @server = new Server env.domain, env.port, {}
        @db = new Db env.db, @server 

        @db.open (err, db) =>
            if err
                console.error 'Couldnt connect to mongo.'
                throw err 

            console.log 'Connected to mongo.'

            @db.authenticate env.user, env.pass, (err, replies) =>
                if err 
                    console.error 'Couldnt authenticate to mongo.'
                    throw err 

                console.log 'Authenticated to mongo'
                @collections().serve app
        @

    collections: =>
        @db.createCollection 'battle', (err, col) =>
            if err? then throw err
            @battles = col
            @battles.ensureIndex {name: 1}, {unique: true}
        @

    getBattle: (req, res, next) =>
        @log 'Get battle'

        battle = req.params.battle 
        console.log "Getting battle #{battle}"

        @battles.find({name: battle}).toArray (err, items) ->
            res.send items

    getBattles: (req, res, next) =>
        @log 'Get battles'

        @battles.find().toArray (err, items) ->
            res.send items

    postBattle: (req, res, next) =>
        params = req.body
        @battles.insert params, (err, item) =>
            if err?
                console.log 'Issue saving...'
                throw err
        res.send params

    clear: (req, res, next) =>
        @battles.remove {}, {safe: true}, (err, result) ->
            if err?
                res.send {result: 'failure'}
            else
                res.send {result: 'success', count: result}

    serve: (app) =>
        app.get '/api/v1/battles', @getBattles
        app.get '/api/v1/battle/:battle', @getBattle
        app.post '/api/v1/create', @postBattle
        app.get '/api/v1/clear', @clear

    log: (action) =>
        # Here so that later we can make it sexy colors and shiz
        console.log "ACTION -- #{action}"


module.exports = Api

mongo = require 'mongodb'
Server = mongo.Server 
Db = mongo.Db 
ObjectId = mongo.BSONPure.ObjectID

creds = require './creds'


class Api
    init: (app) =>
        # PROD vs local
        @server = new Server creds.prod.domain, creds.prod.port, {}
        @db = new Db creds.prod.db, @server 
        # @server = new Server creds.local.domain, creds.local.port, {auto_reconnect: true}
        # @db = new Db creds.local.db, @server 

        @db.open (err, db) =>
            if err
                console.error 'Couldnt connect to mongo.'
                throw err 

            console.log 'Connected to mongo.'

            # PROD vs local
            @db.authenticate creds.prod.user, creds.prod.pass, (err, replies) =>
                if err 
                    console.error 'Couldnt authenticate to mongo.'
                    throw err 

                console.log 'Authenticated to mongo'
                @collections().serve app
            #@collections().serve app
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

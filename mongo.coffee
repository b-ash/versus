mongo = require 'mongodb'
Server = mongo.Server 
Db = mongo.Db 
ObjectId = mongo.BSONPure.ObjectID


class Api
    init: (app) =>
        # PROD vs local
        domain = (String) process.env.PROD_DOMAIN
        port = (Number) process.env.PROD_PORT
        db = (String) process.env.PROD_DB
        user = (String) process.env.PROD_USER
        pass = (String) process.env.PROD_PASS

        # domain = (String) process.env.VERSUS_PROD_DOMAIN
        # port = (Number) process.env.VERSUS_PROD_PORT
        # db = (String) process.env.VERSUS_PROD_DB
        # user = (String) process.env.VERSUS_PROD_USER
        # pass = (String) process.env.VERSUS_PROD_PASS

        @server = new Server domain, port, {}
        @db = new Db db, @server 

        @db.open (err, db) =>
            if err
                console.error 'Couldnt connect to mongo.'
                throw err 

            console.log 'Connected to mongo.'

            # PROD vs local
            @db.authenticate user, pass, (err, replies) =>
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

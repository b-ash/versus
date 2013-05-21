express = require 'express'
{config} = require './config'
data = require './data/battles'

exports.startServer = (port, path, callback) ->
    app = express express.logger()
    port = parseInt(process.env.PORT or port, 10)

    # Express init
    app.configure ->
        app.use express.bodyParser()
        app.use express.methodOverride()

        # Error handling
        app.use express.errorHandler
            dumpExceptions: true
            showStack: true

    # Serve our static assets
    app.use express.static("#{__dirname}/#{path}")
    app.get "/api/v1/battles/", (req, res) ->
        res.json data

    # Serve it up!
    app.listen port, -> 
        console.info "Listening on #{port}, dawg"
    app

# We only start this up if we're not using brunch to run it. Pretty hacky, I know.
exports.startServer config.server.port, config.paths.public unless config.server.run?

envs =
    production: 
        domain: (String) process.env.PROD_DOMAIN
        port: (Number) process.env.PROD_PORT
        db: (String) process.env.PROD_DB
        user: (String) process.env.PROD_USER
        pass: (String) process.env.PROD_PASS

    local_prod:
        domain: (String) process.env.VERSUS_PROD_DOMAIN
        port: (Number) process.env.VERSUS_PROD_PORT
        db: (String) process.env.VERSUS_PROD_DB
        user: (String) process.env.VERSUS_PROD_USER
        pass: (String) process.env.VERSUS_PROD_PASS

    local:
        domain: (String) process.env.VERSUS_LOCAL_DOMAIN
        port: (Number) process.env.VERSUS_LOCAL_PORT
        db: (String) process.env.VERSUS_LOCAL_DB
        user: (String) process.env.VERSUS_LOCAL_USER
        pass: (String) process.env.VERSUS_LOCAL_PASS

# Control creds by env variables
env = (String) process.env.NODE_ENV
if not env? then env = 'local_prod'

module.exports = envs[env]

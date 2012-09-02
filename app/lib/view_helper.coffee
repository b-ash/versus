# Put handlebars.js helpers here

Handlebars.registerHelper "debug", (optionalValue) ->
    console.log("Current Context")
    console.log("====================")
    console.log(@)

    if optionalValue && optionalValue.hash == undefined
        console.log("Value")
        console.log("====================")
        console.log(optionalValue)

Handlebars.registerHelper "keys", (obj, fn) ->
    buffer = ''

    for key of obj
        if obj.hasOwnProperty(key)
            buffer += fn {key: key, value: obj[key]}

    return buffer
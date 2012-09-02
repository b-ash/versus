# Put handlebars.js helpers here

Handlebars.registerHelper "debug", (optionalValue) ->
    console.log("Current Context")
    console.log("====================")
    console.log(@)

    if optionalValue && optionalValue.hash == undefined
        console.log("Value")
        console.log("====================")
        console.log(optionalValue)

Handlebars.registerHelper "keys", (list, ctx, fn) ->
    buffer = ''

    for el in list
        for key, val of el
            if el.hasOwnProperty(key)
                buffer += fn {key: key, value: el[key], ctx: ctx}

    return buffer

Handlebars.registerHelper 'pluck_criteria', (list, key, fn) ->
    buffer = ''

    for el in list
        for criteria in el.criteria
            for k, v of criteria
                if k is key
                    buffer += fn {val: v}

    return buffer

Handlebars.registerHelper 'pluck', (list, fn) ->
    buffer = ''

    for el in list
        for k, v of el
            buffer += fn {key: k, val: v}

    return buffer

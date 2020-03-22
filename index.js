#!/usr/bin/env node
const { isOption } = require('./utils/functions')
const actions = require('./view/actions')
var args = process.argv.slice(2)
if (!args.length) {
    return actions.missingArg()
}

var options = [
    {
        code: '--help',
        alias: '-h',
        action: 'help'
    },
    {
        code: '--version',
        alias: '-v',
        action: 'version'
    }
]
let arg = null
let opt = null
if (isOption(args[0])) {
    opt = args[0]
} else {
    arg = args[0]
}

let match = options.find(o => o.code == opt || o.alias == opt)
if (arg == null && match) {
    return actions[match.action]()
}
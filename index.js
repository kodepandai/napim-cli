#!/usr/bin/env node
const { isOption } = require('./utils/functions')
const optionActions = require('./utils/optionActions')
const argumentActions = require('./utils/argumentActions')
var args = process.argv.slice(2)
if (!args.length) {
    return argumentActions.missingArg()
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
var arguments = [
    {
        code: 'init',
        action: 'init'
    }
]
let arg = null
let opt = null
let params = []
if (isOption(args[0])) {
    opt = args[0]
} else {
    arg = args[0]
    opt = args.filter(x => isOption(x))

}

let match_option = options.find(o => o.code == opt || o.alias == opt)
let match_argument = arguments.find(o => o.code == arg)
params = args.filter((x, i) => i > 0 && x != match_argument.code)
if (arg == null && match_option) {
    return optionActions[match_option.action]()
}
if (match_argument) {
    return argumentActions[match_argument.action](params)
}
return argumentActions.unknownArgument()
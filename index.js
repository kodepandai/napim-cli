#!/usr/bin/env node
const log = require('./utils/customLog')
const { help } = require('./utils/functions')
var arg = process.argv.slice(2)
//default call help
if (!arg.length) return help()
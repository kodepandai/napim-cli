const log = require('../utils/customLog')
const missingArg = function () {
    log.warn('WARN: missing argument')
    log.info('napim -h for more info')
}
const help = function () {
    log.info([
        'Node API Maker CLI',
        '=========================',
        'Author: Akhmad Salafudin',
        'email: axmad386@gmail.com',
        '========================='
    ])
    log.warn('usage  : napim [argument] [option]')
    log.debug([
        'argument   :',
        '   create [project]      create new api project',
        '',
        'option   :',
        '   -h | --help     learn how to use this tool',
        '   -v | --version  print version'
    ])
}
const version = function () {
    log.info('Node API Maker version 1.0.0-b')
}
module.exports = { help, version, missingArg }
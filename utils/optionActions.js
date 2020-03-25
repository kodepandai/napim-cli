const log = require('./customLog')
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
    let ver = require('../package.json').version
    log.info('Node API Maker version ' + ver)
}

module.exports = { help, version }
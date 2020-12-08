const log = require('./customLog')
const path = require('path')
const { basePath } = require('./path')
const help = function () {
    log.info([
        'Node API Maker CLI',
        '=========================',
        'Author: Akhmad Salafudin',
        'email: axmad386@gmail.com',
        '========================='
    ])
    log.warn([
        'usage  : napim [argument]',
        '     or  napim [option]'])
    log.debug(['',
        'argument   :',
        '   init [project_name] [-ts?]        generate new api project',
        '                            -ts      typescript mode',
        '   make:model [model_name]           generate model',
        '   make:service [route] [--method?]  generate service',
        '       example: ',
        '       make:service /users/:id --post',
        '       ..will generate /users/_id_post.(ts|js)',

        '',
        'option   :',
        '   -h | --help     learn how to use this tool',
        '   -v | --version  print version'
    ])
}
const version = function () {
    let json = require(path.resolve(basePath, 'package.json'))
    if (json && json.dependencies.napim) {
        log.info('Node API Maker version ' + json.dependencies.napim.replace('^', ''))
    }
    log.info('Node API Maker CLI version ' + require('../package.json').version)
}

module.exports = { help, version }
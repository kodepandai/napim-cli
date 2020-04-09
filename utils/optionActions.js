const log = require('./customLog')
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
        '       ..will generate /users/post_id.(ts|js)',

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
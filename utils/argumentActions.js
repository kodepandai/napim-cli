const log = require('./customLog')
const path = require('path')
const { basePath, templatePath } = require('./path')
const { isEmpty, isOption } = require('./functions')
const fs = require('fs')
const create = async function (params) {
    if (params.length > 2 || params.length == 0) {
        log.warn('invalid argument or option')
        return log.info('Expected: napim create [project_name] [-ts?]')
    }
    if (isOption(params[0])) return log.warn('invalid project name')
    let project_name = params[0]
    let option = params.length == 2 && isOption(params[1]) ? params[1] : null
    if (option != null && option != '-ts') {
        log.warn('invalid argument or option')
        return log.info('Expected: napim create [project_name] [-ts?]')
    }
    let project_path = path.resolve(basePath, project_name)
    let mode = option ? 'ts' : 'js'
    if (!(await isEmpty(project_path))) {
        log.error('cannot create folder ' + project_name)
        return log.warn(`path ${project_path} already exists and not empty`)
    }
    if (!fs.existsSync(project_path)) {
        fs.mkdirSync(project_name)
    }
    log.warn('init project, please wait ...')
    templates = walk(path.resolve(templatePath, mode), function (err, results) {
        if (err) throw err;
        results.forEach((dir) => {
            let target = dir.replace('.x', '').replace(templatePath + path.sep + mode + path.sep, '')
            let content = ""
            eval("content = " + fs.readFileSync(dir))
            let full_target = path.resolve(project_path, target)
            let target_path = path.dirname(full_target)
            if (!fs.existsSync(target_path)) {
                fs.mkdirSync(target_path, { recursive: true })
            }
            log.info('generate ' + full_target)
            fs.writeFileSync(full_target, content)
        })
        log.success('SUCCESS: napim ready, cd ' + project_name + ' and start your code!')
    })
}
const missingArg = function () {
    log.warn('WARN: missing argument')
    log.info('napim -h for more info')
}
const unknownArgument = function () {
    log.error('unknown argument, use napim -h for more info')
}

var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

module.exports = { create, unknownArgument, missingArg }
const log = require('./customLog')
const path = require('path')
const { basePath, templatePath } = require('./path')
const { isEmpty } = require('./functions')
const fs = require('fs')
const create = async function ([project_name]) {
    let project_path = path.resolve(basePath, project_name)
    if (!(await isEmpty(project_path))) {
        // log.error('cannot create folder ' + project_name)
        // return log.warn(`path ${project_path} already exists and not empty`)
    }
    if (!fs.existsSync(project_path)) {
        fs.mkdirSync(project_name)
    }
    log.info('init project, please wait ...')
    templates = walk(path.resolve(templatePath), function (err, results) {
        if (err) throw err;
        results.forEach((dir) => {
            let target = dir.replace('.x', '').replace(templatePath + path.sep, '')
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
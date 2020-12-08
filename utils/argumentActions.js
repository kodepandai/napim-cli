const camelCase = require('lodash.camelcase')
const log = require('./customLog')
const path = require('path')
const { basePath, templatePath, stubPath, dotEnv } = require('./path')
const { isEmpty, isOption } = require('./functions')
const fs = require('fs')
const init = async function (params) {
    if (params.length > 2 || params.length == 0) {
        log.warn('invalid argument or option')
        return log.info('Expected: napim init [project_name] [-ts?]')
    }
    if (isOption(params[0])) return log.warn('invalid project name')
    let project_name = params[0]
    let option = params.length == 2 && isOption(params[1]) ? params[1] : null
    if (option != null && option != '-ts') {
        log.warn('invalid argument or option')
        return log.info('Expected: napim init [project_name] [-ts?]')
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
        return log.success('SUCCESS: napim ready, cd ' + project_name + ' and start your code!')
    })
}

const make = function (params, arg) {
    let mode = dotEnv('TS') == 'true' ? 'ts' : 'js'
    let json = {}
    if (params.length == 0) {
        return invalidArgument()
    }
    try {
        json = require(path.resolve(basePath, 'package.json'))
        if (json.dependencies && json.dependencies.napim) {
            if (arg.split(':').length != 2) return invalidArgument()
            let module = arg.split(':')[1]
            if (isOption(params[0])) return invalidArgument()
            if (!['service', 'middleware', 'model'].includes(module)) return invalidArgument()
            checkStub(module, mode)
            return generateModule(module, mode, params)

        } else {
            throw new Error
        }

    } catch (error) {
        log.error(error.message)
        return log.warn('WARN: napim not detected, please run this command on your root project')
    }
    return
}
const missingArg = function () {
    log.warn('WARN: missing argument')
    return log.info('napim -h for more info')
}
const invalidArgument = function () {
    log.warn('WARN: invalid argument')
    return log.info('napim -h for more info')
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

var checkStub = function (module, mode) {
    if (!fs.existsSync(path.resolve(stubPath, module + '.napim'))) {
        let content = ""
        eval("content = " + fs.readFileSync(path.resolve(templatePath + path.sep + mode, 'stub' + path.sep + module + '.napim.x')))
        fs.writeFileSync(path.resolve(stubPath, module + '.napim'), content)
    }
}

var generateModule = function (module, mode, params) {
    var methods = []
    var tag = 'default'
    if (module == 'service' && params.length >= 2) {
        params.forEach((p) => {
            if (isOption(p)) {
                if (['post', 'get', 'put', 'delete', 'patch'].includes(p.replace('--', ''))) {
                    methods.push(p.replace('--', ''))
                }
                if (p.includes('--tag')) {
                    tag = p.replace('--tag=', '')
                }
            }
        })
    }
    if (methods.length == 0) {
        methods.push('get')
    }
    if (methods.length > 1) return invalidArgument()

    let method = JSON.stringify(methods) //for service stub
    let module_path = path.resolve(basePath, (dotEnv(module.toUpperCase() + '_PATH' + mode == 'ts' ? '_TS' : '') || mode == 'ts' ? 'src' + path.sep + module : module))
    let file = path.resolve(module_path, params[0].replace(':', '_') + '.' + mode)

    if (module == 'service') {
        let router_path = path.resolve(basePath, (dotEnv('ROUTER') || 'router.js'))
        if (!fs.existsSync(path.dirname(router_path))) {
            fs.mkdirSync(path.dirname(router_path))
        }
        if (!fs.existsSync(router_path)) {
            eval("var router_content = " + fs.readFileSync(path.resolve(templatePath + path.sep + mode + path.sep + 'router.js.x')))
            fs.writeFileSync(router_path, router_content)
        }
        let router = require(router_path)
        let routerIndex = router.findIndex(x => x.tag == tag)
        if (routerIndex == -1) {
            router = router.concat({
                "tag": tag,
                "prefix": "",
                "middleware": [],
                "get": [],
                "post": [],
                "put": [],
                "delete": [],
                "patch": []
            })
            routerIndex = router.length - 1
        }
        let m = methods[0]
        if (!router[routerIndex][m]) {
            router[routerIndex][m] = []
        }
        let prefix = router[routerIndex].prefix
        let checkedPath = params[0][0] == '/' ? params[0] : '/' + params[0]
        if (router.findIndex(x => x.prefix == prefix && x[m]?.findIndex(o => o.path == checkedPath) > -1) > -1) {
            return log.warn(`WARN: route ${checkedPath} with prefix ${JSON.stringify(prefix)} already exists`)
        }
        let arr = params[0].replace(':', '_').split('/')
        if (arr[arr.length - 1][0] == '_') {
            arr[arr.length - 1] = m + '_' + arr[arr.length - 2] + '_by' + arr[arr.length - 1]
        } else {
            arr[arr.length] = m + '_' + arr[arr.length - 1]
        }
        if (arr[0] == '') {
            arr.splice(0, 1)
        }
        arr[arr.length - 1] = camelCase(arr[arr.length - 1])
        let service_path = arr.join('/')
        router[routerIndex][m].push({
            path: params[0][0] == '/' ? params[0] : "/" + params[0],
            service: '/' + service_path
        })
        file = path.resolve(module_path, service_path + '.' + mode)
        if (fs.existsSync(file)) {
            return log.warn('WARN: service ' + service_path + '.' + mode + ' already exists!')
        }
        fs.writeFileSync(router_path, `module.exports = ${JSON.stringify(router, null, 4)}`)
    }
    if (fs.existsSync(file)) {
        return log.warn('WARN: ' + module + ' with name ' + path.basename(file) + ' already exists!')
    }
    if (!fs.existsSync(path.dirname(file))) {
        fs.mkdirSync(path.dirname(file), { recursive: true })
    }
    eval(`var ${module}_name = '${camelCase(path.basename(file).replace('.' + mode, ''))}'`)
    eval("var content = " + fs.readFileSync(path.resolve(stubPath, module + '.napim')))
    log.info('...generating ' + module)
    fs.writeFileSync(file, content)
    return log.success('SUCCESS: ' + module + " generated: " + file.replace(module_path, ''))

}

module.exports = { init, make, invalidArgument, missingArg }
const fs = require('fs')
const path = require('path')
const root = require('../root')
const basePath = path.resolve(process.cwd())

const dotEnv = function (key) {
    try {
        let env = fs.readFileSync(path.resolve(basePath, '.env'), 'utf8').split('\n').filter(x => x != '')
        let envMap = {}
        env.map((o) => {
            envMap[o.trim().split('=')[0]] = o.trim().split('=')[1]

        })
        return envMap[key] || null
    } catch (error) {
        null
    }
}

const stubPath = path.resolve(basePath, 'stub')
const templatePath = path.resolve(root, 'template')

module.exports = { basePath, stubPath, templatePath, root, dotEnv }
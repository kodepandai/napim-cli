const path = require('path')
const root = require('../root')
const basePath = path.resolve(process.cwd())
const servicePath = basePath + (process.env.SERVICE_PATH || '/services')
const templatePath = path.resolve(root, 'template')

module.exports = { basePath, servicePath, templatePath, root }
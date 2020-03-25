const fs = require('fs')
const isOption = function (text) {
    if (text.length < 2) return false
    if (text[0] == '-') return true
    return false
}
const isEmpty = function (dir) {
    return fs.promises.readdir(dir).then(files => {
        return files.length === 0;
    }).catch(err => {
        if (err.code == 'ENOENT') return true
    })
}

module.exports = { isOption, isEmpty }
const { Yellow, Green, Red, Blue } = require('./color')
const print = function (color, message) {
    if (!message) return console.log(message)
    console.log(color, message.constructor == Array ? message.join('\n') : message)
}
const success = function (message) {
    print(Green, message)
}
const warn = function (message) {
    print(Yellow, message)
}
const error = function (message) {
    print(Red, message)
}
const info = function (message) {
    print(Blue, message)
}
const debug = function (message) {
    if (!message) return console.log(message)
    console.log(message.constructor == Array ? message.join('\n') : message)
}

module.exports = { success, warn, error, info, debug }
const { Yellow, Green, Red, Blue } = require('./color')
const print = function (color, message) {
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

module.exports = { success, warn, error, info }
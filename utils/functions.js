const isOption = function (text) {
    if (text.length < 2) return false
    if (text[0] == '-') return true
    return false
}
module.exports = { isOption }
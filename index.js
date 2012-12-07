var slice = Array.prototype.slice
    , EventEmitter = require("events").EventEmitter
    , reemit = require("./reemit")

ReEmitter.reemit = reemit

module.exports = ReEmitter

function ReEmitter(other, list) {
    var emitter = new EventEmitter()

    reemit(other, emitter, list)

    return emitter
}

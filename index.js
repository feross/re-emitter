var slice = Array.prototype.slice
    , EventEmitter = require("events").EventEmitter

ReEmitter.reemit = reemit

module.exports = ReEmitter

function ReEmitter(other, list) {
    var emitter = new EventEmitter()

    list.forEach(reemit, {
        emitter: emitter
        , other: other
    })

    return emitter
}

function reemit(name) {
    var emitter = this.emitter
        , other = this.other

    other.on(name, emit)

    function emit() {
        var args = slice.call(arguments)
        args.unshift(name)
        emitter.emit.apply(emitter, args)
    }
}
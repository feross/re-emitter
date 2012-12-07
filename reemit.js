var toArray = require("to-array")
    , isArray = Array.isArray

module.exports = reemit

function reemit(source, target, events) {
    if (!isArray(events)) {
        events = [events]
    }

    events.forEach(proxyEvent, {
        source: source
        , target: target
    })
}

function proxyEvent(eventName) {
    var source = this.source
        , target = this.target

    source.on(eventName, propagate)

    function propagate() {
        var args = toArray(arguments)
        args.unshift(eventName)
        target.emit.apply(target, args)
    }
}

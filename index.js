module.exports = reemit
module.exports.filter = filter

const EventEmitter = require('events').EventEmitter

function reemit (source, target, events) {
  if (!Array.isArray(events)) events = [events]

  const listeners = []
  events.forEach(function (event) {
    const listener = function () {
      const args = [].slice.call(arguments)
      args.unshift(event)
      target.emit.apply(target, args)
    }
    listeners.push(listener)
    source.on(event, listener)
  })

  return function cancel () {
    events.forEach(function (event, i) {
      source.removeListener(event, listeners[i])
    })
  }
}

function filter (source, events) {
  const emitter = new EventEmitter()
  reemit(source, emitter, events)
  return emitter
}

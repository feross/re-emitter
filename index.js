module.exports = reemit
module.exports.filter = filter

var EventEmitter = require('events').EventEmitter

function reemit (source, target, events) {
  if (!Array.isArray(events)) events = [ events ]
  var result = []

  events.forEach(function (event) {
    var callback = function () {
      var args = [].slice.call(arguments)
      args.unshift(event)
      target.emit.apply(target, args)
    }
    source.on(event, callback)
    result.push(function(){
      source.removeListener(event, callback)
    })
  })

  return result;
}

function filter (source, events) {
  var emitter = new EventEmitter()
  emitter._destroyers = reemit(source, emitter, events)
  return emitter
}

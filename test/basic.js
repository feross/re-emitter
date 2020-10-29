const EventEmitter = require('events').EventEmitter
const reemit = require('../')
const test = require('tape')

test('Re-emit events from another emitter', function (t) {
  t.plan(1)
  const emitter = new EventEmitter()
  const other = new EventEmitter()

  reemit(emitter, other, ['foo', 'bar'])

  other.on('foo', function () {
    t.pass('foo fired')
  })

  emitter.emit('foo')

  other.on('baz', function () {
    t.fail('baz should not fire on other emitter')
  })

  emitter.emit('baz')

  emitter.on('bar', function () {
    t.fail('bar should not fire on original emitter')
  })

  other.emit('bar')
})

test('Cancel reemitting at some point in the future', function (t) {
  t.plan(2)
  const emitter = new EventEmitter()
  const other = new EventEmitter()

  const cancel = reemit(emitter, other, ['foo', 'bar'])

  other.on('foo', function () {
    t.pass('foo fired')
  })

  // these should fire
  emitter.emit('foo')
  emitter.emit('foo')

  cancel()

  // none of these should fire
  emitter.emit('foo')
  emitter.emit('foo')
  emitter.emit('foo')
})

test('Re-emit events from another emitter with arguments', function (t) {
  t.plan(4)
  const emitter = new EventEmitter()
  const other = new EventEmitter()

  reemit(emitter, other, ['foo', 'bar'])

  other.on('foo', function (arg1, arg2) {
    t.pass('foo fired')
    t.equal(arg1, 'arg1')
    t.equal(arg2, 'arg2')
    t.equal(arguments[2], undefined)
  })

  emitter.emit('foo', 'arg1', 'arg2')
})

test('Filter events from another emitter', function (t) {
  t.plan(1)
  const emitter = new EventEmitter()
  const other = reemit.filter(emitter, ['foo', 'bar'])

  other.on('foo', function () {
    t.pass('foo fired')
  })

  emitter.emit('foo')

  other.on('baz', function () {
    t.fail('baz should not fire on other emitter')
  })

  emitter.emit('baz')

  emitter.on('bar', function () {
    t.fail('bar should not fire on original emitter')
  })

  other.emit('bar')
})

# re-emitter [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[travis-image]: https://img.shields.io/travis/feross/re-emitter/master.svg
[travis-url]: https://travis-ci.org/feross/re-emitter
[npm-image]: https://img.shields.io/npm/v/re-emitter.svg
[npm-url]: https://npmjs.org/package/re-emitter
[downloads-image]: https://img.shields.io/npm/dm/re-emitter.svg
[downloads-url]: https://npmjs.org/package/re-emitter
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

#### Re emit events from another emitter

![reemit](https://raw.githubusercontent.com/feross/re-emitter/master/img.jpg)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/magnet-uri.svg)](https://saucelabs.com/u/magnet-uri)

Works in node and the browser with [browserify](http://browserify.org/).

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### install

```
npm install re-emitter
```

### usage

```js
var reemit = require('re-emitter')

var emitter = new EventEmitter()
var other = new EventEmitter()

reemit(emitter, other, ['foo', 'bar'])

other.on('foo', function () {
  // foo will fire on other emitter!
})

emitter.emit('foo')

other.on('baz', function () {
  // baz will not fire on other emitter
})

emitter.emit('baz')
```

#### canceling re-emitting

`reemit` returns a `function`, which when called, cancels all re-emitting by removing the
event listeners which it added.

### contributors

- Raynos
- Feross

### license

MIT. Copyright (c) Raynos.

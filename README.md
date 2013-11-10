[![NPM version](https://badge.fury.io/js/refractory.png)](http://badge.fury.io/js/refractory)
[![Build Status](https://secure.travis-ci.org/vesln/refractory.png)](http://travis-ci.org/vesln/refractory)
[![Coverage Status](https://coveralls.io/repos/vesln/refractory/badge.png?branch=master)](https://coveralls.io/r/vesln/refractory?branch=master)
[![Code Climate](https://codeclimate.com/github/vesln/refractory.png)](https://codeclimate.com/github/vesln/refractory)

# Refractory

## Synopsis

Refactory is a thin `require` wrapper that will allow you to load files from
conventional paths.

## Description

When implementing CLI apps it's often a requirement to support "formatters",
"reporters" and various ".rc" files. In my case I needed to add support for formatters
to both [curiosity](https://github.com/vesln/curiosity) and
[hell](https://github.com/vesln/hell). However, allowing users to implement
custom formatters is a nifty feature. This is how refractory was born.

### Usage

```js
var refractory = require('refractory');
var load = refractory(module, './hell/formatters', '{{HOME}}/.hell/formatters');
var Formatter = load('hell-awesome-formatter', 'awesome-formatter');
```

Refractory will try to load 'hell-awesome-formatter' then 'awesome-formatter' from the
following locations.

- ./hell/formatters/
- ~/.hell/formatters/
- node_modules/my-awesome-formatter

You may also add addition template slugs by setting them on refractory.

```js
// set
refractory.PKG_HOME = require('path').join(refractory.HOME, '.hell');

// use
var load = refractory(module, '{{PKG_HOME}}/formatters');
```

#### Errors

In case the requested file can't be found refractory will throw an error.
The error has the following extra properties:

- code - Always equals to "MODULE_NOT_FOUND"
- paths - An array of all of the variations that refractory tried to load. Useful
  for debugging issues

## Installation

```bash
$ npm install refractory
```

## Tests

### Running the tests

```bash
$ npm test
```

### Test coverage

```bash
$ npm run-script coverage
```

## Credits

Special thanks to:

  - [Jake Luer](https://github.com/logicalparadox)

## Support the author

Do you like this project? Star the repository, spread the word - it really helps. You may want to follow
me on [Twitter](https://twitter.com/vesln) and
[GitHub](https://github.com/vesln). Thanks!

## License

**MIT License**

Copyright (C) 2013 Veselin Todorov (hi@vesln.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

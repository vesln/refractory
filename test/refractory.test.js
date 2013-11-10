var join = require('path').join;
var refractory = require('..');

var first = join(__dirname, 'fixtures', 'first');
var second = join(__dirname, 'fixtures', 'second');
var third = join(__dirname, 'fixtures', 'third');

describe('refractory', function() {
  it('tries to load files based on argument priority', function() {
    var load = refractory(first, second, third);
    expect(load('a')).to.eq('first');
    expect(load('b')).to.eq('second');
    expect(load('c')).to.eq('third');
  });

  it('tries to load multiple variations of files based on argument priority', function() {
    var load = refractory(first, second, third);
    expect(load('pre-a', 'a')).to.eq('first');
    expect(load('pre-b', 'b')).to.eq('second');
    expect(load('pre-c', 'c')).to.eq('third');
    expect(load('alt-a', 'a')).to.eq('alt first');
    expect(load('alt-b', 'b')).to.eq('alt second');
    expect(load('alt-c', 'c')).to.eq('alt third');
  });

  it('tries to load files as node_modules lastly', function() {
    var load = refractory(first);
    expect(load('chai')).to.be.ok; // jshint ignore: line
  });


  it('throws a sane error when it cannot load a file', function() {
    var load = refractory(first);
    var err = null;

    try {
      load('this-is-imposible-to-load-probably');
    } catch (e) {
      err = e;
    }

    expect(err).to.exist; // jshint ignore: line
    expect(err).to.instanceOf(Error);
    expect(err.code).to.eq('MODULE_NOT_FOUND');
  });
});

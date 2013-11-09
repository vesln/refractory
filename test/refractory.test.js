var join = require('path').join;
var main = join(__dirname, 'fixtures', 'main');
var refractory = require('..');
var load = require('..')(main, 'refractory');

describe('refractory', function() {
  it('tries to load files from the main directory first', function() {
    expect(load('b')).to.eq('main');
  });

  it('tries to load files as modules secondly', function() {
    expect(load('chai')).to.be.ok; // jshint ignore: line
  });

   it('tries to load files from the home directory lastly', function() {
    refractory._home = join(__dirname, 'fixtures', 'home');
    expect(load('a')).to.eq('main');
  });

   it('throws a sane error when it cannot load a file', function() {
     var err = null;

     try {
       load('this-is-imposible-to-load-probably');
     } catch (e) {
       err = e;
     }

     expect(err).to.instanceOf(Error);
     expect(err.code).to.eq('MODULE_NOT_FOUND');
   });
});

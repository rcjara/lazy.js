var expect = require('expect.js')
  , s = require('../lib/stream.js')
  ;

describe('stream', function() {
  describe('nats', function() {
    it('has a function "next"', function() {
      expect( typeof s.nats().next )
            .to.equal('function');
    });

    it('contains a val with the first natural number', function() {
      expect( s.nats().val )
            .to.equal(1);
    });
  });

  describe('take', function() {
    it('produces an array from a stream', function() {
      expect( s.take(5, s.nats) )
            .to.eql([1, 2, 3, 4, 5]);
    });
  });

  describe('filter', function() {
    it('produces a filtered stream', function() {
      var isEven = function(i) { return i % 2 == 0; };
      expect( s.take(5, s.filter(isEven, s.nats)) )
            .to.eql([2, 4, 6, 8, 10]);
    });
  });

  describe('map', function() {
    it('produces a mapped stream', function() {
      var times3 = function(i) { return i * 3; };
      expect( s.take(5, s.map(times3, s.nats)))
            .to.eql([3, 6, 9, 12, 15]);
    });
  });

  describe('terminatingNats', function() {
    it('terminates', function() {
      expect(
        s.take(10, s.terminatingNats)
        ).to.eql([1,2,3,4,5]);
    });
  });

  describe('reduce', function() {
    it('works', function() {
      var add = function(a,b) {return a + b;};
      expect( s.reduce(add, 0, s.terminatingNats)).to.eql(15);
    });
  });

});


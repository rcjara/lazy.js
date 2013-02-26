var expect = require('expect.js')
  , stream = require('../lib/stream.js')
  ;

describe('stream', function() {
  describe('nats', function() {
    it('has a function "next"', function() {
      expect( typeof stream.nats().next )
            .to.equal('function');
    });

    it('contains a val with the first natural number', function() {
      expect(stream.nats().val)
            .to.equal(1);
    });
  });

  describe('take', function() {
    it('produces an array from a stream', function() {
      expect( stream.take(5, stream.nats) )
            .to.eql([1, 2, 3, 4, 5]);
    });
  });
});


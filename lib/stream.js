module.exports = (function() {
  exports.nats = function() {
    var recur = function(i) {
      return { val: i
             , next: function() { return recur(i + 1); }
             };
    }

    return recur(1);
  };

  exports.terminatingNats = function() {
    var recur = function(i) {
      if (i > 5) {
        return {};
      } else {
        return { val: i
               , next: function() { return recur(i + 1); }
               };
      }
    };

    return recur(1);
  };

  exports.map = function(fn, stream) {
    var newPair = stream();
    return function() {
      return { val: fn(newPair.val)
             , next: exports.map(fn, newPair.next)
             };
    };
  };

  exports.filter = function(fn, stream) {
    var newPair = stream();
    if (fn(newPair.val)) {
      return function() {
        return { val: newPair.val
               , next: exports.filter(fn, newPair.next)
               };
      }
    } else {
      return exports.filter(fn, newPair.next);
    }
  };

  exports.take = function(n, stream) {
    if (n <= 0) {
      return [];
    } else {
      var newPair = stream();
      return [ newPair.val ].concat( exports.take(n-1, newPair.next ) );
    }
  };

  return exports;
})();


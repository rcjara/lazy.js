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
      return { val: i
             , next: i == 5 ? null : function() { return recur(i + 1); }
             };
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
      if (newPair.next) {
        return [ newPair.val ].concat( exports.take(n-1, newPair.next ) );
      } else {
        return [newPair.val];
      }
    }
  };

  exports.scan = function(op, init, stream) {
    return function() {
      var s = stream();
      var v = op(init, s.val);
      return { val: v
             , next: s.next ? exports.scan(op, v, s.next) : null
             };
      };
   };

   exports.reduce = function(op, init, stream) {
     var s = exports.scan(op, init, stream);
     var cur = s();
     while (cur.next) {
       cur = cur.next();
     }
     return cur.val;
   };
   
   
   exports.sum = function(stream) {
     return exports.reduce(function(a,b) {return a+b;}, 0, stream);
   };

  return exports;
})();


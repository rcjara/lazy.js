var nats = function() {
  var recur = function(i) {
    return { val: i
           , next: function() { return recur(i + 1); }
           };
  }

  return recur(1);
};

var terminatingNats = function() {
  var recur = function(i) {
    if (i > 5) {
      return { val: undefined
             , next: function () { return recur(i + 1); }
             };
    } else {
      return { val: i
             , next: function() { return recur(i + 1); }
             };
    }
  };

  return recur(1);
};

var streamMap = function(fn, stream) {
  var newPair = stream();
  return function() {
    return { val: fn(newPair.val)
           , next: streamMap(fn, newPair.next)
           };
  };
};

var streamFilter = function(fn, stream) {
  var newPair = stream();
  if (fn(newPair.val)) {
    return function() {
      return { val: newPair.val
             , next: streamFilter(fn, newPair.next)
             };
    }
  } else {
    return streamFilter(fn, newPair.next);
  }
};

//var streamFoldr = function(fn, acc, stream) {
//  var newPair = stream();
//  return function() {
//
//  };
//};

var take = function(n, stream) {
  if (n <= 0) {
    return [];
  } else {
    var newPair = stream();
    console.log( JSON.stringify(newPair) );
    console.log(n);
    return [ newPair.val ].concat( take(n-1, newPair.next ) );
  }
};


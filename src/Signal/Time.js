// module Signal.Time

exports.everyP =
  function everyP(constant, now, t) {
    var out = constant(now());
    setInterval(function() {
      out.set(now());
    }, t);
    return out;
  };

exports.now =
  function now() {
    var perf = typeof performance !== 'undefined' ? performance : null,
        proc = typeof process !== 'undefined' ? process : null;
    return (
      perf && (perf.now || perf.webkitNow || perf.msNow || perf.oNow || perf.mozNow) ||
      (proc && proc.hrtime && function() {
        var t = proc.hrtime();
        return (t[0] * 1e9 + t[1]) / 1e6;
      }) ||
      Date.now
    ).call(perf);
  };
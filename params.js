(function(){
  var Params = function(url) {
    return Params.prototype.parse(url);
  };
  Params.prototype = function() {
    var parseParamsFromURL = function(searchURL) {
      var paramsRegexp = /([^?=&;]+)(?:=([^&;]*))?/g;
      var search = searchURL || window.location.search;
      var q = decodeURIComponent(search.replace("+", "%20"));
      var p = {};
      var paramDim;
      var leaf;
      var keyDimRegexp = /(?:(\w+)|\[(\w+)\]|\[()\])/g;
      var lastKey, newNode;
      var autoIncremntDimension = {};
      q.replace(paramsRegexp, function(global, k, v) {
        paramDim = -1;
        leaf = p;
        k.replace(keyDimRegexp, function(glob, rootKey, dimKey, arrayType) {
          paramDim = paramDim + 1;
          if (rootKey) {
            p[rootKey] = p[rootKey] || null;
            lastKey = rootKey;
          } else {
            if (dimKey) {
              newNode = leaf[lastKey];
              if (!newNode) {
                newNode = {};
                newNode[dimKey] = null;
              }
              leaf[lastKey] = newNode;
              leaf = leaf[lastKey];
              lastKey = dimKey;
            } else {
              if (arrayType === "") {
                autoIncremntDimension[paramDim] = autoIncremntDimension.hasOwnProperty(paramDim) ? autoIncremntDimension[paramDim] + 1 : 0;
                newNode = leaf[lastKey] || {};
                newNode[autoIncremntDimension[paramDim]] = null;
                leaf[lastKey] = newNode;
                leaf = leaf[lastKey];
                lastKey = autoIncremntDimension[paramDim];
              }
            }
          }
          return "";
        });
        leaf[lastKey] = v;
        return "";
      });
      return p;
    };
    return{"v":"0.1-pre", "parse":parseParamsFromURL};
  }();
  window.Params = Params;
}());


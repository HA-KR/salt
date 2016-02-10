/** WINDOW COOKIE HASH PARAM SEARCH */
/* Salt Sugar SaltFactory Water Minerals Salted Cookie Pickle Preserve Consume Hydrate Dehydrate Ocean Filter Salinate Desalinate Density Dissolve Solution pH Rain Evaporate */
/* Salt: extract params from search URL */

(function () {
  "use strict";
  /**
   * common name for a mixture of utilities: PARAMS, COOKIES
  */
  var Salt = function (url) {
    if(console && console.log){console.log("use new Salt() instead.");}
    var NaCl = new Salt(url);
    return NaCl;
  };
  Salt.prototype = (function () {
    var getCookie = function () {if(console && console.log){console.log("yet to be written code :)");} };
    var setCookie = function () {if(console && console.log){console.log("yet to be written code :)");} };
    var parseParamsFromURL = function (searchURL) {
      var paramsRegexp = /([^?=&;]+)(?:=([^&;]*))?/g;
      var search = searchURL || window.location.search;
      var q = decodeURIComponent(search.replace("+", "%20"));
      var p = {}; //the params hash
      var paramDim;
      var leaf;
      var keyDimRegexp = /(?:(\w+)|\[(\w+)\]|\[()\])/g;
      var lastKey, newNode;
      var keyDimensions = {};
      q.replace(paramsRegexp, function (global, k, v) {
        paramDim = -1;
        leaf = p; //reference
        k.replace(keyDimRegexp, function (glob, rootKey, dimKey, arrayType) {
          paramDim = paramDim + 1;

          if (rootKey) {
            p[rootKey] = (p[rootKey] || null);
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
                keyDimensions[paramDim] = (keyDimensions.hasOwnProperty(paramDim)) ? keyDimensions[paramDim] + 1 : 0;
                newNode = (leaf[lastKey] || {});
                newNode[keyDimensions[paramDim]] = null;
                leaf[lastKey] = newNode;
                leaf = leaf[lastKey];
                lastKey = keyDimensions[paramDim];
              }
            }
          }
          return '';
        });
        leaf[lastKey] = v;
        return '';
      });
      return p;
    };
    //the api
    return {
      'v': '1.0 minute',
      'parse': parseParamsFromURL,
      'cookies': {
        'set': setCookie,
        'get': getCookie
      }
    };
  }());
})();

/*
var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}*/

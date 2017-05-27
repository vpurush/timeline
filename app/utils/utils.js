var _ = require("lodash");

var utils = function(){

};

utils.prototype.parseParam = function(){
    var output = {};
    var href = location.href;
    var startOfQueryParams = href.indexOf("?");
    if(startOfQueryParams != -1){
        var endOfQueryParams = href.indexOf("#");
        if(endOfQueryParams == -1){
            endOfQueryParams = href.length - 1;
        }
        var paramsString = href.substring(startOfQueryParams + 1, endOfQueryParams);
        if(paramsString.length > 0){
            var params = paramsString.split("&");
            params.forEach(function(p){
                var kv = p.split("=");
                output[kv[0]] = kv[1];                
            });
        }        
    }
    return output;
};

utils.prototype.addParam = function(key, val){
    console.log("addParam");

    var origin = location.origin;
    var pathname = location.pathname;
    var hash = location.hash;
    var paramsObj = this.parseParam();
    var newUrl = origin + pathname + "?";

    _.each(paramsObj, function(v, k){
        if(v){
            newUrl += k + "=" + v + "&";
        }
    });
    newUrl += key + "=" + val;

    newUrl += hash;
    history.pushState(null, document.title, newUrl);

    console.log("newurl", newUrl);
};

utils.prototype.removeParam = function(key){
    console.log("removeParam");

    var origin = location.origin;
    var pathname = location.pathname;
    var hash = location.hash;
    var paramsObj = this.parseParam();
    var newUrl = origin + pathname + "?";

    _.each(paramsObj, function(v, k){
        if(k != key){
            newUrl += k + "=" + v + "&";
        }
    });
    newUrl = newUrl.substring(newUrl.length - 1);

    newUrl += hash;
    history.pushState(null, document.title, newUrl);

    console.log("newurl", newUrl);
};

window.u = new utils();

module.exports = new utils();
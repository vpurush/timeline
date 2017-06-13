const isMongoLab = (url) => {
    return url.indexOf('api.mlab.com') != -1;
};

const formQueryParam = (obj) => {
    var str = "";
    _.each(obj, function(val, name){
        str += name + '=' + JSON.stringify(val) + '&';
    });
    return str;
};

export const fetchData = (url, config) => {
    if(isMongoLab(url)){
        url = url + "?apiKey=QYsAaeLP2Q4InN71m94sdyAMxwbA9t7V";
    }
    if(config){
        if(config.method && (config.method.toLowerCase() == "post" || config.method.toLowerCase() == "put")){
            config.headers = {
                "Content-Type": "application/json"
            };
        }
        
        if(config.params){
            if(url.indexOf('?') == -1){
                url = url + '?';
            }else{
                url = url + '&';
            }
            url = url + formQueryParam(config.params);
            delete config.params;
        }
        if(config.body){
            config.body = JSON.stringify(config.body);
        }
    }

    return fetch(url, config)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then((response) => {
        return response.json();
    });

};
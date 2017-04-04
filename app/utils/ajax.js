const isMongoLab = (url) => {
    return url.indexOf('api.mlab.com') != -1;
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
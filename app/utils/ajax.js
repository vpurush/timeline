const isMongoLab = (url) => {
    return url.indexOf('api.mlab.com') != -1;
};

export const fetchData = (url) => {
    if(isMongoLab(url)){
        url = url + "?apiKey=QYsAaeLP2Q4InN71m94sdyAMxwbA9t7V";
    }

    return fetch(url).then((response) => {
        return response.json();
    });

};
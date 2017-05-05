export const Authentication = (prevState, action) => {
    if(action.type == "AUTHENTICATE"){
        return {
            isAuthenticated: true,
            User: {
                username: action.username,
                userid: action.userid
            }
        };
    }else{
        return prevState || {
            isAuthenticated: false,
            User: null
        };
    }
};
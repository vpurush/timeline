export const Authentication = (prevState, action) => {
    if(action.type == "AUTHENTICATE"){
        return {
            isAuthenticated: true,
            User: {
                username: action.username
            }
        };
    }else{
        return prevState || {
            isAuthenticated: false,
            User: null
        };
    }
};
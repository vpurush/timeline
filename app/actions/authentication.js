export const AuthenticationSuccess = (username, id) => {
    if(!username || !id){
        throw new Error("username or id is missing");
    }
    return {
        type: "AUTHENTICATE",
        username: username,
        userid: id
    };
};
export const AuthenticationSuccess = (username, id) => {
    return {
        type: "AUTHENTICATE",
        username: username,
        id: id
    };
};
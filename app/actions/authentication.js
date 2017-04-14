export const AuthenticationSuccess = (username) => {
    return {
        type: "AUTHENTICATE",
        username: username
    };
};
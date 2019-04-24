import constants from "../types";
import api from "../api";

export const login = credentials => dispatch => {
    dispatch({
        type: constants.LOGIN_REQUEST
    });

    api.user
        .login(credentials)
        .then(user => {
            dispatch({
                type: constants.LOGIN_SUCCESS,
                payload: user.userAttributes
            });

            // store the token
            const { accessToken, idToken, refreshToken } = user.tokens;
            localStorage.accessToken = accessToken;
            localStorage.idToken = idToken;
            localStorage.refreshToken = refreshToken;
            localStorage.userId = user.userAttributes.userid;
            localStorage.userEmail = credentials.username;
            return user;
        })
        .catch(error => {
            console.log('Login Error: ', error);
            dispatch({
                type: constants.LOGIN_FAILED,
                payload: error
            });
        });
};
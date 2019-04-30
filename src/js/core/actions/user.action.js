
import constants from "../types";
import axios from "axios";
import { axiosConfig, tokenAxiosConfig, getAPIUrl, get, get_new, post, post_new } from '../api'
import { handleError, clearError } from './common.action'
import { fetchCategories, getCarts, getFavourites } from "../../actions/app.actions";

import store from '../../store';
import { ACTIONS } from "../constants";
const dispatch = store.dispatch;


const register = async (data) => {
    dispatch({
        type: constants.SIGNUP_REQUEST
    });
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('signup', data);
            if (response) {
                dispatch({
                    type: constants.SIGNUP_SUCCESS
                });
            } else {
                dispatch({
                    type: constants.SIGNUP_FAILED
                });
            }
            resolve(response);
        } catch (error) {
            dispatch({
                type: constants.SIGNUP_FAILED,
                payload: error
            });
            reject(error);
        }
    });
};

const login = async (data) => {
    dispatch({
        type: constants.LOGIN_REQUEST
    });
    try {
        let response = await post('signin', data);
        if (response && response.data) {
            dispatch({
                type: constants.LOGIN_SUCCESS,
                payload: response.data.userAttributes
            });

            // store the token
            const { accessToken, idToken, refreshToken } = response.data.tokens;
            localStorage.accessToken = accessToken;
            localStorage.idToken = idToken;
            localStorage.refreshToken = refreshToken;
            localStorage.userId = response.data.userAttributes.userid;
            localStorage.userEmail = data.username;
            return response;
        }
    } catch (error) {
        console.log("LOGLIN_ERROR: ", error);
        dispatch({
            type: constants.LOGIN_FAILED,
            payload: error
        });
    }
};

const logout = () => {
    delete localStorage.accessToken;
    delete localStorage.idToken;
    delete localStorage.refreshToken;
    delete localStorage.userid;

    dispatch({
        type: constants.USER_LOGOUT,
        payload: null
    });
};

const sendResetPasswordEmail = async (data) => {
    try {

        let response = await post('sendCodeForgotPaswordUser', data)
        if(response && response.status === 200) {
            return true
        }

        dispatch({
            type: ACTIONS.ERROR,
            payload: 'Something went wrong'
        });

        return false

    } catch (error) {
        handleError(error);
        return false
    }
}

const confirmResetPassword = async (data) => {
    try {

        if(data.password !== data.password_new) {
            handleError('Passwords don\'t match');
            return
        }

        let response = await post('confirmForgotPasswordUser', data);
        if(response && response.status === 200) {
            return true
        }

        dispatch({
            type: ACTIONS.ERROR,
            payload: 'Something went wrong'
        });

        return false
    } catch(error) {
        handleError(error);
        return false
    }
}

const refreshToken = async () => {
    try {
        let response = await axios.post(getAPIUrl('getUserRefreshTokens'), { username: localStorage.userId }, tokenAxiosConfig());

        if (response && response.data) {
            const { accessToken, idToken, refreshToken, userName } = response.data;
            localStorage.accessToken = accessToken.jwtToken;
            localStorage.idToken = idToken.jwtToken;
            localStorage.refreshToken = refreshToken.token;
            localStorage.username = userName;
            return response;
        }
    } catch (error) {
        // handleError(error);
    }
};

const getUser = async () => {
    try {
        if (localStorage.accessToken) {
            const token = await refreshToken();
            if (token) {
                let response = await get('getUserInfo');
                dispatch({
                    type: ACTIONS.ERROR,
                    payload: ''
                });
                if (response && response.data) {
                    dispatch({
                        type: ACTIONS.LOGGED_IN,
                        payload: response.data.userAttributes
                    });

                    getCarts();
                    getFavourites();
                    fetchCategories();
                }
            }
        }
    } catch (error) {
        // handleError(error);
    }
};

export {
    login,
    logout,
    register,
    refreshToken,
    getUser,
    confirmResetPassword,
    sendResetPasswordEmail,
}
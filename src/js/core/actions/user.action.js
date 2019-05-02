import axios from "axios";
import { axiosConfig, tokenAxiosConfig, getAPIUrl, get, get_new, post, post_new } from '../api/index'
import { handleError, clearError } from './common.action'
import { fetchCategories } from './category.action';
import { getCarts } from "./cart.action";
import { getFavourites } from "./favourite.action";
import constants from "../types";
import store from '../../store';
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
    dispatch({
        type: constants.RESET_PWD_REQUEST
    });
    try {
        let response = await post('sendCodeForgotPaswordUser', data)
        if(response && response.status === 200) {
            dispatch({
                type: constants.RESET_PWD_SUCCESS
            });
            return true;
        }
        dispatch({
            type: constants.RESET_PWD_FAILED,
            payload: 'Something went wrong'
        });
        return false;
    } catch (error) {
        dispatch({
            type: constants.RESET_PWD_FAILED
        });
        handleError(error);
        return false;
    }
};

const confirmResetPassword = async (data) => {
    try {
        if(data.password !== data.password_new) {
            handleError('Passwords don\'t match');
            return;
        }

        let response = await post('confirmForgotPasswordUser', data);
        if(response && response.status === 200) {
            return true;
        }
        handleError('Something went wrong');
        return false
    } catch(error) {
        handleError(error);
        return false
    }
};

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
                if (response && response.data) {
                    getCarts();
                    getFavourites();
                    fetchCategories();
                }
            }
        }
    } catch (error) {
        handleError(error);
    }
};

const socialLogin = async (idToken, accessToken) => {
    dispatch({
        type: constants.LOGIN_REQUEST
    });
    try {
        localStorage.idToken = idToken;
        localStorage.accessToken = accessToken;
        let response = await get_new('socialProviderTokenExchange');
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
            return response;
        }
    } catch (error) {
        dispatch({
            type: constants.LOGIN_FAILED
        });
        handleError(error);
    }
};

const confirmUser = async (username, confirmationCode) => {
    dispatch({
        type: constants.CONFIRM_USER_REQUEST
    });
    try {
        let response = await post('confirmUser', { username, confirmationCode });
        dispatch({
            type: constants.CONFIRM_USER_SUCCESS
        });
        return response;
    } catch (error) {
        dispatch({
            type: constants.CONFIRM_USER_FAILED,
        });
        handleError(error);
    }
};

export {
    login,
    logout,
    getUser,
    register,
    confirmUser,
    refreshToken,
    socialLogin,
    confirmResetPassword,
    sendResetPasswordEmail,
}
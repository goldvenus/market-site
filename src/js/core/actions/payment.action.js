import constants  from "../types";
import { handleError } from "./common.action";
import { post } from "../api/index";
import store from '../../store';
const dispatch = store.dispatch;

const payment = data => {
    return new Promise(async (resolve, reject) => {
        dispatch({
            type: constants.DO_PAYMENT_REQUEST
        });
        try {
            let param = data;
            param.email = localStorage.userEmail;
            let response = await post('dopayment', param);
            resolve(response.data);
            dispatch({
                type: constants.DO_PAYMENT_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            handleError(error);
            dispatch({
                type: constants.DO_PAYMENT_FAILED
            });
            reject(error);
        }
    });
};

const getPaymentCards = data => {
    return new Promise(async (resolve, reject) => {
        dispatch({
            type: constants.GET_PAY_CARDS_REQUEST
        });
        try {
            let response = await post('getpaycards', {user_id: data});
            resolve(response.data);
            dispatch({
                type: constants.GET_PAY_CARDS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            handleError(error);
            reject(error);
            dispatch({
                type: constants.GET_PAY_CARDS_FAILED
            });
        }
    });
};

const getPaidItems = data => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('getpaiditems', data);
            resolve(response.data);
        } catch (error) {
            handleError(error);
            reject(error);
        }
    });
};

export {
    payment, getPaidItems, getPaymentCards
}
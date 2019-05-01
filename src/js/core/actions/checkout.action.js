import constants  from "../types";
import { handleError } from "./common.action";
import { post } from "../api";
import store from '../../store';
const dispatch = store.dispatch;

const checkout = data => {
    return new Promise(async (resolve, reject) => {
        dispatch({
            type: constants.DO_CHECKOUT_REQUEST
        });
        try {
            let response = await post('docheckout', data);
            resolve(response.data);
            dispatch({
                type: constants.DO_CHECKOUT_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            handleError(error);
            reject(error);
            dispatch({
                type: constants.DO_CHECKOUT_FAILED
            });
        }
    });
};

const getCheckout = data => {
    return new Promise(async (resolve, reject) => {
        dispatch({
            type: constants.GET_CHECKOUT_REQUEST
        });
        try {
            let response = await post('getcheckout', {user_id: data});
            resolve(response.data);
            dispatch({
                type: constants.GET_CHECKOUT_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            handleError(error);
            reject(error);
            dispatch({
                type: constants.GET_CHECKOUT_FAILED
            });
        }
    });
};

export {
    checkout, getCheckout
}
import constants  from "../types";
import { handleError } from "./common.action";
import { get, post } from "../api";
import store from '../../store';
const dispatch = store.dispatch;

const addCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('addGearIntoCart', data);
            if (response.data.status === 'success') {
                dispatch({
                    type: constants.ADD_TO_CART,
                    payload: response.data.data
                });
            }
            resolve(response.data);
        } catch (error) {
            handleError(error);
            reject(error);
        }
    });
};

const getCarts = async () => {
    try {
        let response = await get('viewUserCart');

        dispatch({
            type: constants.CARTS,
            payload: response.data
        });
    } catch (error) {
        handleError(error);
    }
};

const deleteCartItem = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('deleteGearFromCart', data);
            if (response.data.status === 'success') {
                dispatch({
                    type: constants.DELETE_CART_ITEM,
                    payload: data.gearid
                });
            } else {
                resolve(false);
            }
        } catch (error) {
            handleError(error);
        }
    });
};

export { addCart, deleteCartItem, getCarts };
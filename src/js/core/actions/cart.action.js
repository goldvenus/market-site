import constants  from "../types";
import { handleError, handleInfo } from "./common.action";
import { get, post } from "../api/index";
import store from '../../store';
const dispatch = store.dispatch;

const addCart = (data) => {
    dispatch({
        type: constants.ADD_TO_CART_REQUEST
    });
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('addGearIntoCart', data);
            if (response.data.status === 'success') {
                dispatch({
                    type: constants.ADD_TO_CART_SUCCESS,
                    payload: response.data.data
                });
                if (response.data.removed) {
                    // if gear was removed from favor
                    dispatch({
                        type: constants.DELETE_FAVOURITE_SUCCESS,
                        payload: data.gearid
                    });
                }
                handleInfo('Gear was added to cart');
            } else {
                handleError(response.data.errorMessage);
            }
            resolve(response.data.data);
        } catch (error) {
            dispatch({
                type: constants.ADD_TO_CART_FAILED
            });
            handleError(error);
            reject(error);
        }
    });
};

const getCarts = async () => {
    dispatch({
        type: constants.GET_CARTS_REQUEST
    });
    try {
        let response = await get('viewUserCart');
        dispatch({
            type: constants.GET_CARTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: constants.GET_CARTS_FAILED
        });
        handleError(error);
    }
};

const deleteCartItem = async (data) => {
    dispatch({
        type: constants.DELETE_CART_ITEM_REQUEST
    });
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('deleteGearFromCart', data);
            if (response.data.status === 'success') {
                dispatch({
                    type: constants.DELETE_CART_ITEM_SUCCESS,
                    payload: data.gearid
                });
                dispatch({
                    type: constants.GET_FAVOURITES_SUCCESS,
                    payload: response.data.data
                });
                handleInfo('Gear was removed from cart successfully!');
            } else {
                resolve(false);
                handleError('Gear was not removed!');
            }
        } catch (error) {
            handleError(error);
        }
    });
};

export { addCart, deleteCartItem, getCarts };
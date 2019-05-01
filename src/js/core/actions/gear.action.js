import constants from "../types";
import { handleError } from "./common.action";
import { post, post_new, get, get_new } from "../api/index";
import store from '../../store';
const dispatch = store.dispatch;

const addGear = async (data) => {
    try {
        let response = await post('addGearItem', data);
        return response.data.status;
    } catch (error) {
        handleError(error);
    }
};

const getGear = async (gearid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('viewAddedGearItem', { gearid });
            dispatch({
                type: constants.GEAR,
                payload: response.data[0]
            });
            resolve(response);
        } catch (error) {
            handleError(error);
            reject(error);
        }
    });
};

const getListGears = async () => {
    try {
        let response = await get('viewUserGearList');
        if (response && response.data) {
            dispatch({
                type: constants.LIST_GEARS,
                payload: response.data.Items
            });
        }
    } catch (error) {
        handleError(error);
    }
};

const rentGearProductList = async (catDetail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('showRentGearProductsList', catDetail);
            resolve(response.data);
        } catch (error) {
            handleError(error);
            reject(error);
        }
    });
};

const newArrivals = async () => {
    try {
        let response = await get_new('viewNewArrivalGears');

        if (response) {
            dispatch({
                type: constants.NEW_ARRIVALS,
                payload: response.data
            });
        }
    } catch (error) {
        handleError(error);
    }
};

const deleteGear = async (data) => {
    return new Promise(async (resolve) => {
        try {
            let response = await post_new('deleteUserGear', data);
            if (response) {
                dispatch({
                    type: constants.DELETE_GEAR,
                    payload: data.gearid
                });
                resolve(response.status);
            } else {

            }
        } catch (error) {
            handleError(error);
        }
    });
};

const searchHome = async (brand, product_region) => {
    dispatch({
        type: constants.SEARCH_HOME_REQUEST
    });
    try {
        let response = await post_new('showHomePageSearch', {
            brand,
            product_region
        });

        if (response) {
            dispatch({
                type: constants.SEARCH_HOME_SUCCESS,
                payload: response.data
            });
        }
    } catch (error) {
        handleError(error);
        dispatch({
            type: constants.SEARCH_HOME_FAILED,
        });
    }
};

export {
    newArrivals, addGear, deleteGear, getGear, rentGearProductList, getListGears, searchHome
};
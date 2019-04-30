import { ACTIONS } from "../constants";
import { handleError } from "./common.action";
import { post, post_new, get, get_new } from "../api";
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
                type: ACTIONS.GEAR,
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
                type: ACTIONS.LIST_GEARS,
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
                type: ACTIONS.NEW_ARRIVALS,
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
                    type: ACTIONS.DELETE_GEAR,
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

export {
    newArrivals, addGear, deleteGear, getGear, rentGearProductList, getListGears
};
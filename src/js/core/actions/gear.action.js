import constants from "../types";
import { handleError, handleInfo } from "./common.action";
import { post, get} from "../api/index";
import store from '../../store';
const dispatch = store.dispatch;

const addGear = async (data) => {
    dispatch({
        type: constants.ADD_GEAR_REQUEST,
    });
    let response = await post('addGearItem', data);
    if (response && response.data && response.data.status === 'success') {
        dispatch({
            type: constants.ADD_GEAR_SUCCESS,
        });
        handleInfo('Gear was added successfully!');
        return response.data.data;
    } else {
        handleError('Gear was not added!');
        return false;
    }
};

const editGear = async (data) => {
    dispatch({
        type: constants.EDIT_GEAR_REQUEST,
    });
    try {
        let response = await post('editGearItem', data);
        if (response.data.status === 'success' ) {
            dispatch({
                type: constants.EDIT_GEAR_SUCCESS,
                payload: data
            });
            handleInfo('Gear was edited');
            return response.data.status;
        } else {
            handleError('Gear was not edited');
        }
    } catch (error) {
        handleError(error);
    }
};

const getGear = async (gearid) => {
    dispatch({
        type: constants.GET_GEAR_REQUEST
    });
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('viewAddedGearItem', { gearid });
            if (response.data.status === 'success') {
                dispatch({
                    type: constants.GET_GEAR_SUCCESS,
                    payload: response.data.data
                });
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            dispatch({
                type: constants.GET_GEAR_FAILED
            });
            handleError(error);
            reject(error);
        }
    });
};

const getListGears = async () => {
    dispatch({
        type: constants.LIST_GEARS_REQUEST
    });
    try {
        let response = await get('viewUserGearList');
        if (response && response.data) {
            dispatch({
                type: constants.LIST_GEARS_SUCCESS,
                payload: response.data.Items
            });
        }
    } catch (error) {
        dispatch({
            type: constants.LIST_GEARS_FAILED
        });
        handleError(error);
    }
};

const rentGearProductList = async (catDetail) => {
    // dispatch({
    //     type: constants.LIST_GEARS_REQUEST
    // });

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
    dispatch({
        type: constants.NEW_ARRIVALS_REQUEST,
    });
    try {
        let response = await get('viewNewArrivalGears');

        if (response) {
            dispatch({
                type: constants.NEW_ARRIVALS_SUCCESS,
                payload: response.data
            });
        }
    } catch (error) {
        dispatch({
            type: constants.NEW_ARRIVALS_FAILED,
        });
        handleError(error);
    }
};

const deleteGear = async (data) => {
    dispatch({
        type: constants.DELETE_GEAR_REQUEST
    });
    return new Promise(async (resolve) => {
        try {
            let response = await post('deleteUserGear', data);
            if (response) {
                dispatch({
                    type: constants.DELETE_GEAR_SUCCESS,
                    payload: data.gearid
                });
                resolve(response.status);
            }
        } catch (error) {
            dispatch({
                type: constants.DELETE_GEAR_FAILED
            });
            handleError(error);
        }
    });
};

const searchHome = async (brand, product_region) => {
    dispatch({
        type: constants.SEARCH_HOME_REQUEST
    });
    try {
        let response = await post('showHomePageSearch', {
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
    newArrivals, addGear, deleteGear, getGear, rentGearProductList, getListGears, searchHome, editGear
};
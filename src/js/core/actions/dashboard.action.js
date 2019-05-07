import constants from "../types";
import { handleError } from "./common.action";
import { get, post } from "../api/index"
import store from '../../store';
const dispatch = store.dispatch;

const viewUserDashboard = async () => {
    dispatch({
        type: constants.GET_USER_DASHBOARD_REQUEST,
    });
    try {
        let response = await get('viewUserDashboard');

        if (response) {
            dispatch({
                type: constants.GET_USER_DASHBOARD_SUCCESS,
                payload: response.data
            });
        }
    } catch (error) {
        dispatch({
            type: constants.GET_USER_DASHBOARD_FAILED,
        });
        handleError(error);
    }
};

const dashboardMyListing = async () => {
    dispatch({
        type: constants.GET_MY_LISTINGS_REQUEST,
    });
    try {
        let response = await get('viewUserGearList');
        if (response && response.data) {
            dispatch({
                type: constants.GET_MY_LISTINGS_SUCCESS,
                payload: response.data.Items
            });
        }
    } catch (error) {
        dispatch({
            type: constants.GET_MY_LISTINGS_FAILED,
        });
        handleError(error);
    }
};

const dashboardMyRentals = async () => {
    dispatch({
        type: constants.GET_MY_RENTALS_REQUEST,
    });
    try {
        let response = await get('userDashboardRentalProductList');
        dispatch({
            type: constants.GET_MY_RENTALS_SUCCESS,
            payload: response.data.Items
        });
    } catch (error) {
        dispatch({
            type: constants.GET_MY_RENTALS_FAILED,
        });
        handleError(error);
    }
};

const getOrderHistory = async () => {
    dispatch({
        type: constants.GET_ORDER_HISTORY_REQUEST,
    });
    try {
        let response = await get('getorderhistory');
        if (response.data.status === 'success') {
            dispatch({
                type: constants.GET_ORDER_HISTORY_SUCCESS,
                payload: response.data.data
            });
        }
    } catch (error) {
        dispatch({
            type: constants.GET_ORDER_HISTORY_FAILED
        });
        handleError(error);
    }
};

const getOrderDetail = async (data) => {
    dispatch({
        type: constants.GET_ORDER_DETAIL_REQUEST
    });
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('getorderdetail', data);
            dispatch({
                type: constants.GET_ORDER_DETAIL_SUCCESS
            });
            if (response.data.status === 'success') {
                resolve(response.data.data);
            } else {
                reject(false);
            }
        } catch (error) {
            dispatch({
                type: constants.GET_ORDER_DETAIL_FAILED
            });
            handleError(error);
            reject(false);
        }
    });
};

const getGearRentState = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('getGearRentState', data);
            resolve(response.data.data);
        } catch (error) {
            handleError(error);
            reject(false);
        }
    });
};

const setBlockPeriod = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('setBlockPeriod', data);
            resolve(response.data);
        } catch (error) {
            handleError(error);
            reject(false);
        }
    });
};

export {
    viewUserDashboard, dashboardMyListing, dashboardMyRentals, getOrderDetail, getOrderHistory,
    getGearRentState, setBlockPeriod
}
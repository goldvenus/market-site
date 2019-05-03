import constants from "../types";
import {clearMsg, handleError, handleInfo} from "./common.action";
import store from '../../store';
import { get, post } from "../api/index";
const dispatch = store.dispatch;

const addFavourites = async (data) => {
    clearMsg();
    dispatch({
        type: constants.ADD_FAVOURITE_REQUEST,
    });
    try {
        let response = await post('addUserFavouriteGear', data);
        if (response.data.status === 'success') {
            dispatch({
                type: constants.ADD_FAVOURITE_SUCCESS,
                payload: response.data.data
            });
            handleInfo('Gear was added to favorite');
        } else {
            handleError('Gear was not added to favorite');
        }
    } catch (error) {
        dispatch({
            type: constants.ADD_FAVOURITE_FAILED,
        });
        handleError(error);
    }
};

const getFavourites = async () => {
    dispatch({
        type: constants.GET_FAVOURITES_REQUEST
    });
    try {
        let response = await get('viewUserFavouriteGear');
        if (response) {
            dispatch({
                type: constants.GET_FAVOURITES_SUCCESS,
                payload: response.data.Items
            });
        }
    } catch (error) {
        handleError(error);
        dispatch({
            type: constants.GET_FAVOURITES_FAILED,
        });
    }
};

const deleteFavourite = async (data) => {
    clearMsg();
    dispatch({
        type: constants.DELETE_FAVOURITE_REQUEST,
    });
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('deleteUserFavouriteGear', data);
            if (response.data.status === 'success') {
                dispatch({
                    type: constants.DELETE_FAVOURITE_SUCCESS,
                    payload: data.gearid
                });
                handleInfo('Gear was removed from favorite');
            } else {
                dispatch({
                    type: constants.DELETE_FAVOURITE_FAILED,
                });
                handleError('Gear was not removed');
                resolve(false);
            }
        } catch (error) {
            dispatch({
                type: constants.DELETE_FAVOURITE_FAILED,
            });
            handleError(error);
        }
    });
};

export {
    addFavourites,
    getFavourites,
    deleteFavourite
}
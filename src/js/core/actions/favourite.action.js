import constants from "../types";
import { handleError } from "./common.action";
import store from '../../store';
import { get, post } from "../api/index";
const dispatch = store.dispatch;

const addFavourites = async (data) => {
    dispatch({
        type: constants.ADD_FAVOURITE_REQUEST,
    });
    try {
        let response = await post('addUserFavouriteGear', data);
        dispatch({
            type: constants.ADD_FAVOURITE_SUCCESS,
            payload: response.data
        });
        return response;
    } catch (error) {
        handleError(error);
        dispatch({
            type: constants.ADD_FAVOURITE_FAILED,
        });
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
            } else {
                resolve(false);
                dispatch({
                    type: constants.DELETE_FAVOURITE_FAILED,
                });
            }
        } catch (error) {
            handleError(error);
            dispatch({
                type: constants.DELETE_FAVOURITE_FAILED,
            });
        }
    });
};

export {
    addFavourites,
    getFavourites,
    deleteFavourite
}
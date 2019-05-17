import constants from "../types";
import { handleError, handleInfo } from "./common.action";
import { get, post } from "../api";
import store from '../../store';
const dispatch = store.dispatch;

const addFavourites = async (data) => {
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
    if (!localStorage.accessToken) {
        return;
    }

    dispatch({
        type: constants.GET_FAVOURITES_REQUEST
    });
    try {
        let response = await get('viewUserFavouriteGear');
        if (response && response.data && response.data.status && response.data.status === 'success' ) {
            dispatch({
                type: constants.GET_FAVOURITES_SUCCESS,
                payload: response.data.data
            });
        }
    } catch (error) {
        dispatch({
            type: constants.GET_FAVOURITES_FAILED,
        });
        handleError(error);
    }
};

const deleteFavourite = async (data) => {
    dispatch({
        type: constants.DELETE_FAVOURITE_REQUEST,
    });
    try {
        let response = await post('deleteUserFavouriteGear', data);
        if (response.data.status === 'success') {
            dispatch({
                type: constants.DELETE_FAVOURITE_SUCCESS,
                payload: data.gearid
            });
            handleInfo('Gear was removed from favorite successfully!');
        } else {
            dispatch({
                type: constants.DELETE_FAVOURITE_FAILED,
            });
            handleError('Gear was not removed!');
        }
    } catch (error) {
        dispatch({
            type: constants.DELETE_FAVOURITE_FAILED,
        });
        handleError(error);
    }
};

export {
    addFavourites,
    getFavourites,
    deleteFavourite
}
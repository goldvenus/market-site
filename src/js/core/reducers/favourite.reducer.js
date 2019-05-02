import producer from 'immer';
import constants from "../types";

const initialState = {
    favourites: null,
    isLoading: false,
    isDeleting: false
};

export default (state = initialState, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case constants.GET_FAVOURITES_REQUEST:
                draft.isLoading = true;
                break;
            case constants.GET_FAVOURITES_SUCCESS:
                draft.isLoading = false;
                draft.favourites = action.payload;
                break;
            case constants.GET_FAVOURITES_FAILED:
                draft.isLoading = false;
                break;

            case constants.ADD_FAVOURITE_REQUEST:
                draft.isLoading = true;
                break;
            case constants.ADD_FAVOURITE_SUCCESS:
                draft.isLoading = false;
                draft.favorites = [...draft.favorites, action.payload];
                break;
            case constants.ADD_FAVOURITE_FAILED:
                draft.isLoading = false;
                break;

            case constants.DELETE_FAVOURITE_REQUEST:
                draft.isDeleting = true;
                break;
            case constants.DELETE_FAVOURITE_SUCCESS:
                draft.favorites = draft.favorites.filter(item => item.gearid !== action.payload);
                draft.isDeleting = false;
                break;
            case constants.DELETE_FAVOURITE_FAILED:
                draft.isDeleting = false;
                break;

            default:
                break;
        }
    })
};
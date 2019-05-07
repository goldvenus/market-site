import producer from 'immer';
import constants from "../types";
import { getUniqueObjectArray } from "../helper";

const initialState = {
    favourites: null,
    isLoading: false,
    isChanging: false
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
                draft.isChanging = true;
                break;
            case constants.ADD_FAVOURITE_SUCCESS:
                draft.isChanging = false;
                draft.favourites = getUniqueObjectArray([...draft.favourites, action.payload]);
                break;
            case constants.ADD_FAVOURITE_FAILED:
                draft.isChanging = false;
                break;

            case constants.DELETE_FAVOURITE_REQUEST:
                draft.isChanging = true;
                break;
            case constants.DELETE_FAVOURITE_SUCCESS:
                draft.favourites = draft.favourites.filter(item => item.gearid !== action.payload);
                draft.isChanging = false;
                break;
            case constants.DELETE_FAVOURITE_FAILED:
                draft.isChanging = false;
                break;

            default:
                break;
        }
    })
};
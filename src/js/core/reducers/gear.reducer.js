import producer from 'immer';
import constants from "../types";

const initialState = {
    gear: null,
    listGears: null,
    productList: null,
    newArrivals: null,
    searchResults: null,
    isLoading: false,
};

export default (state = initialState, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case constants.ADD_GEAR_REQUEST:
                draft.isLoading = true;
                break;
            case constants.ADD_GEAR_SUCCESS:
                draft.listGears = [...draft.listGears, action.payload];
                draft.isLoading = false;
                break;
            case constants.ADD_GEAR_FAILED:
                draft.isLoading = false;
                break;

            case constants.LIST_GEARS_REQUEST:
                draft.isLoading = true;
                break;
            case constants.LIST_GEARS_SUCCESS:
                draft.listGears = action.payload;
                draft.isLoading = false;
                break;
            case constants.LIST_GEARS_FAILED:
                draft.isLoading = false;
                draft.listGears = null;
                break;

            case constants.GET_GEAR_REQUEST:
                draft.isLoading = true;
                break;
            case constants.GET_GEAR_SUCCESS:
                draft.gear = action.payload;
                draft.isLoading = false;
                break;
            case constants.GET_GEAR_FAILED:
                draft.isLoading = false;
                draft.gear = null;
                break;

            case constants.DELETE_GEAR_REQUEST:
                draft.isLoading = true;
                break;
            case constants.DELETE_GEAR_SUCCESS:
                draft.listGears = draft.listGears.filter(item => item.gearid !== action.payload);
                draft.isLoading = false;
                draft.gear = null;
                break;
            case constants.DELETE_GEAR_FAILED:
                draft.isLoading = false;
                draft.gear = null;
                break;

            case constants.NEW_ARRIVALS_REQUEST:
                draft.isLoading = true;
                break;
            case constants.NEW_ARRIVALS_SUCCESS:
                draft.newArrivals = action.payload;
                draft.isLoading = false;
                break;
            case constants.NEW_ARRIVALS_FAILED:
                draft.newArrivals = null;
                draft.isLoading = false;
                break;

            case constants.SEARCH_HOME_REQUEST:
                draft.isLoading = true;
                break;
            case constants.SEARCH_HOME_SUCCESS:
                draft.searchResult = action.payload;
                draft.isLoading = false;
                break;
            case constants.SEARCH_HOME_FAILED:
                draft.isLoading = false;
                break;

            default:
                break;
        }
    });
}
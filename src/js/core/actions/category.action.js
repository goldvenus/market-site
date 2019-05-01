import axios from "axios";
import constants from '../types'
import { API_URL } from "../constants";
import { handleError } from "./common.action";
import store from '../../store';
const dispatch = store.dispatch;

const fetchCategories = () => {
    dispatch({
        type: constants.GET_CATEGORIES_REQUEST,
    });
    try {
        let response = axios.get(API_URL + 'getAllProductsCategory');
        dispatch({
            type: constants.GET_CHECKOUT_SUCCESS,
            payload: response
        });
    } catch (error) {
        handleError(error);
        dispatch({
            type: constants.GET_CARTS_FAILED,
        });
    }
};

export { fetchCategories }
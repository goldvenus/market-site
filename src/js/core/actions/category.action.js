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
      type: constants.GET_CATEGORIES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: constants.GET_CATEGORIES_FAILED,
    });
    handleError(error);
  }
};

export { fetchCategories }
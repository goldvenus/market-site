import constants from '../types'
import { handleError } from "./common.action";
import { get } from "../api"
import store from '../../store';
const dispatch = store.dispatch;

const fetchCategories = async () => {
  dispatch({
    type: constants.GET_CATEGORIES_REQUEST,
  });
  try {
    let response = await get('getAllProductsCategory');
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
import { ACTIONS } from '../constants';
import store from "../../store";

const dispatch = store.dispatch;

const handleError = (error) => {
    dispatch({
        type: ACTIONS.ERROR,
        payload: error || 'Something went wrong'
    });
};

const clearError = () => {
    dispatch({
        type: ACTIONS.REMOVE_ERROR,
        payload: null
    });
};

export {
    handleError, clearError
}
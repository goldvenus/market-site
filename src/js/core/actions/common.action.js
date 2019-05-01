import constants from '../types';
import store from "../../store";
const dispatch = store.dispatch;

const handleError = (error) => {
    dispatch({
        type: constants.ERROR,
        payload: error || 'Something went wrong'
    });
};

const clearError = () => {
    dispatch({
        type: constants.CLEAR_ERROR,
        payload: null
    });
};

const readFileData = (event) => {
    return new Promise((resolve, reject) => {
        let input = event.target;

        if (input && input.files.length > 0) {
            let fileReader = new FileReader();
            fileReader.onload = (event) => {
                resolve(event.target.result);
            };

            fileReader.onerror = (e) => reject('error');
            fileReader.readAsDataURL(input.files[0]);
        }
    });
};

export {
    handleError, clearError, readFileData
}
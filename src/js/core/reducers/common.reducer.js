import producer from 'immer';
import constants from "../types";

const initialState = {
    errorMsg: null,
    infoMsg: null
};

export default (state = initialState, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case constants.ERROR:
                draft.errorMsg = action.payload;
                break;

            case constants.CLEAR_MSG:
                draft.errorMsg = null;
                draft.infoMsg = null;
                break;

            case constants.INFO:
                draft.infoMsg = action.payload;
                break;

            default:
                break;
        }
    });
}

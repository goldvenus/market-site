import producer from 'immer';
import constants from "../types";

const initialState = {
  isSendingEmail: false
};

export default (state = initialState, action) => {
  return producer(state, draft => {
    switch (action.type) {
      case constants.SEND_EMAIL_REQUEST:
        draft.isSendingEmail = true;
        break;
      case constants.SEND_EMAIL_SUCCESS:
        draft.isSendingEmail = false;
        break;
      case constants.SEND_EMAIL_FAILED:
        draft.isSendingEmail = false;
        break;
        
      default:
        break;
    }
  });
}

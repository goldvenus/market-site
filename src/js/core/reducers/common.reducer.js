import producer from 'immer';

const initialState = {
};

export default (state = initialState, action) => {
    return producer(state, draft => {
        switch (action.type) {
            default:
                break;
        }
    });
}

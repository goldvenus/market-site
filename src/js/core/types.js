import keyMirror from "keymirror";

export default keyMirror({
    // login request
    LOGIN_REQUEST: null,
    LOGIN_SUCCESS: null,
    LOGIN_FAILED: null,

    // logout
    USER_LOGOUT: null,

    // register request
    SIGNUP_REQUEST: null,
    SIGNUP_SUCCESS: null,
    SIGNUP_FAILED: null,
    SIGNUP_LOAD: null,

    //reset pwd request
    RESET_PWD_REQUEST: null,
    RESET_PWD_SUCCESS: null,
    RESET_PWD_FAILED: null

    // list gears
    LIST_GEARS_REQUEST: null,
    LIST_GEARS_SUCCESS: null,
    LIST_GEARS_FAILED: null,

    // add gear
    ADD_GEAR_REQUEST: null,
    ADD_GEAR_SUCCESS: null,
    ADD_GEAR_FAILED: null,

    // get gear
    GET_GEAR_REQUEST: null,
    GET_GEAR_SUCCESS: null,
    GET_GEAR_FAILED: null,

    // delete gear
    DELETE_GEAR_REQUEST: null,
    DELETE_GEAR_SUCCESS: null,
    DELETE_GEAR_FAILED: null,

    // new arrival gears
    NEW_ARRIVALS_REQUEST: null,
    NEW_ARRIVALS_SUCCESS: null,
    NEW_ARRIVALS_FAILED: null,

    // add cart
    ADD_TO_CART_REQUEST: null,
    ADD_TO_CART_SUCCESS: null,
    ADD_TO_CART_FAILED: null,

    // delete cart
    DELETE_CART_ITEM_REQUEST: null,
    DELETE_CART_ITEM_SUCCESS: null,
    DELETE_CART_ITEM_FAILED: null,

    // get carts
    GET_CARTS_REQUEST: null,
    GET_CARTS_SUCCESS: null,
    GET_CARTS_FAILED: null,
});
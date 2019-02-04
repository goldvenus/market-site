const API_URL = 'https://cors-anywhere.herokuapp.com/https://6smd2dtwhh.execute-api.us-east-1.amazonaws.com/dev/';
const ACTIONS = {
  USER: 'user',
  ERROR: 'error',
  REMOVE_ERROR: 'removeError',
  LOGGED_IN: 'loggedIn',
  LOGGED_OUT: 'loggedOut',
  FETCH_CATEGORIES: 'fetCategories',
  LIST_GEARS: 'listGears',
  GEAR: 'gear',
  CARTS: 'carts',
  GEAR_PRODUCT_LIST : 'gearProductList',
  DASHBOARD_MY_LISTINGS :'dashboardMyListing',
  DASHBOARD_MY_RENTALS :'dashboardMyRentals'
}
export { API_URL, ACTIONS }

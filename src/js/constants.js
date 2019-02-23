const API_URL = 'https://cors-anywhere.herokuapp.com/https://7qalj7pu52.execute-api.us-east-1.amazonaws.com/dev/';
const API_URL_NEW = 'https://cors-anywhere.herokuapp.com/https://2rj9lw7ja3.execute-api.us-east-1.amazonaws.com/dev/';

const REDIRECT_URL = 'https://creativemarket.herokuapp.com/';
const CLIENT_ID = '675fq4fofgrirq2c9ciutolva6';

const FACEBOOK_LOGIN_URL = `https://creative-market.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;

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
  GEAR_PRODUCT_LIST: 'gearProductList',
  DASHBOARD_MY_LISTINGS: 'dashboardMyListing',
  DASHBOARD_MY_RENTALS: 'dashboardMyRentals',
  SEARCH_RESULTS: 'searchResults',
  FAVOURITES: 'favourites',
  NEW_ARRIVALS: 'newArrivals',
  DASHBOARD: 'dashboard',
};
export { API_URL, ACTIONS, API_URL_NEW, FACEBOOK_LOGIN_URL };

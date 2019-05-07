const API_URL = 'http://localhost:3001/';
// const API_URL = 'https://cors-anywhere.herokuapp.com/https://7qalj7pu52.execute-api.us-east-1.amazonaws.com/dev/';

const REDIRECT_URL = 'https://creativemarket.herokuapp.com/';
const CLIENT_ID = '675fq4fofgrirq2c9ciutolva6';
const FACEBOOK_LOGIN_URL = `https://creative-market.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;

export { API_URL, FACEBOOK_LOGIN_URL };
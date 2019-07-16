import moment from "moment";

const calcDaysDiff = (date1, date2) => {
  if (date1 === null || date2 === null || date1 === undefined || date2 === undefined) return 0;
  let timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const getDateStr = dateStr => {
  if (!dateStr) return false;
  let date = new Date(dateStr);
  return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getUTCFullYear();
  // return moment(date).format('DD.MM.YYYY');
};

const getYearMonthStr = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10)
    month = '0' + month;
  
  return {yearMonth: year + '-' + month};
};

const getUTCDateFormat = (date) => date && ((date.getUTCMonth() + 1) + '.' + date.getUTCDate() + '.' + date.getUTCFullYear()) + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ' GMT';

const formatDate = (date) => {
  return date && moment(date).format('YYYY-MM-DD');
};

const days = (d1, d2) => {
  return moment(d2).diff(moment(d1), 'days') + 1;
};

const getUniqueObjectArray = obj_arr => {
  return obj_arr.filter((thing, index) => {
    return index === obj_arr.findIndex(obj => {
      return JSON.stringify(obj) === JSON.stringify(thing);
    });
  })
};

const validateCard = value => {
  let new_value = value.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;
  for (let i = new_value.length - 1; i >= 0; i--) {
    let digit = parseInt(new_value.charAt(i));
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  let valid = (sum % 10) === 0;
  let accepted = false;
  let acceptedCreditCards = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
    diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/
  };
  Object.keys(acceptedCreditCards).forEach(function (key) {
    let regex = acceptedCreditCards[key];
    if (regex.test(new_value)) {
      accepted = true;
    }
  });
  return valid && accepted;
};

const cc_format = value => {
  if (!value)
    return value;
  
  let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  let matches = v.match(/\d{4,16}/g);
  if (matches === null)
    return v;
  
  let match = matches.length ? matches[0] : '';
  let parts = [];
  
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }
  
  if (parts.length) {
    return parts.join(' ')
  } else {
    return value
  }
};

const checkDigitSpace = value => {
  return /^[\d,' ']*$/.test(value);
};

const sortCompare = (field) => {
  return function(a, b) {
    const genreA = a[field];
    const genreB = b[field];
    
    let comparison = 0;
    if (genreA < genreB) {
      comparison = 1;
    } else if (genreA > genreB) {
      comparison = -1;
    }
    return comparison;
  }
};

const validateEmail = (mail) => {
  if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true
  }
  return false;
};

export {
  calcDaysDiff, getDateStr, formatDate, days, getUTCDateFormat, getYearMonthStr,
  getUniqueObjectArray, validateCard, cc_format, checkDigitSpace, sortCompare, validateEmail
}
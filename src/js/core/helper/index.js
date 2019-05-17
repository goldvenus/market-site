import moment from "moment";

const calcDaysDiff = (date1, date2) => {
  if (date1 === null || date2 === null || date1 === undefined || date2 === undefined) return 0;
  let timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const getDateStr = date => {
    return date && moment(date).format('DD.MM.YYYY');
};

const getUTCDateFormat = (date) => ((date.getUTCMonth()+1) + '.' + date.getUTCDate() + '.' + date.getUTCFullYear()) + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ' GMT';

const formatDate = (date) => {
    return date && moment(date).format('YYYY-MM-DD');
};

const days = (d1, d2) => { return moment(d2).diff(moment(d1), 'days') + 1; };

const getUniqueObjectArray = obj_arr => {
    return obj_arr.filter((thing, index) => {
        return index === obj_arr.findIndex(obj => {
            return JSON.stringify(obj) === JSON.stringify(thing);
        });
    })
};

const validateCard = value => {
    var new_value = value.replace(/\D/g, '');
    var sum = 0;
    var shouldDouble = false;
    for (var i = new_value.length - 1; i >= 0; i--) {
        var digit = parseInt(new_value.charAt(i));
        if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    var valid = (sum % 10) === 0;
    var accepted = false;
    var acceptedCreditCards = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
        diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/
    };
    Object.keys(acceptedCreditCards).forEach(function(key) {
        var regex = acceptedCreditCards[key];
        if (regex.test(new_value)) {
            accepted = true;
        }
    });
    return valid && accepted;
};

const cc_format = value => {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{4,16}/g);
    var match = matches.length ? matches[0] : '';
    var parts = [];

    for (let i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
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

export {
    calcDaysDiff, getDateStr, formatDate, days, getUTCDateFormat,
    getUniqueObjectArray, validateCard, cc_format, checkDigitSpace
}
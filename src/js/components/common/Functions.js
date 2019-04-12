import moment from "moment";

export const calcDaysDiff = (date1, date2) => {
  if (date1 === null || date2 === null || date1 === undefined || date2 === undefined) return 0;
  let timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export const getDateStr = date_obj => {
    return date_obj && moment(date_obj).format('DD.MM.YYYY');
}
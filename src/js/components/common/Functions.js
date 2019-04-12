
export const calcDaysDiff = (date1, date2) => {
  if (date1 === null || date2 === null) return 0;
  let timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
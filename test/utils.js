export const add = (value, unit, date = new Date()) => {
  date.setTime(date.getTime() + value * unit);
  return date;
};

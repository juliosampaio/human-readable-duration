//in miliseconds
export const ONE_MINUTE = 60000;
export const ONE_HOUR = 3600000;
export const ONE_DAY = 86400000;
export const ONE_WEEK = 604800000;
export const ONE_MONTH = 2592000000;
export const ONE_YEAR = 31536000000;

const _45_MINUTES = 45 * ONE_MINUTE;
const _20_HOURS = 20 * ONE_HOUR;
const _6_DAYS = 6 * ONE_DAY;
const _4_WEEKS = 4 * ONE_WEEK;
const _11_MONTHS = 10.84 * ONE_MONTH;

const buildUnitRange = (name, min, max) => ({ name, min, max });

export const MINUTE = buildUnitRange('MINUTE', ONE_MINUTE, _45_MINUTES);
export const HOUR = buildUnitRange('HOUR', ONE_HOUR, _20_HOURS);
export const DAY = buildUnitRange('DAY', ONE_DAY, _6_DAYS);
export const WEEK = buildUnitRange('WEEK', ONE_WEEK, _4_WEEKS);
export const MONTH = buildUnitRange('MONTH', ONE_MONTH, _11_MONTHS);
export const YEAR = buildUnitRange('YEAR', ONE_YEAR, Infinity);

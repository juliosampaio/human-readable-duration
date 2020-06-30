import { withTranslationProxy } from './locales';
import { ONE_MINUTE, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR } from './units';

const UNITS = [MINUTE, HOUR, DAY, WEEK, MONTH];

const translate = (diff, { min, name: unitName }, locale) => {
  const val = Math.round(Math.abs(diff) / min);

  const translation = withTranslationProxy(locale, unitName, val);

  if (Math.abs(diff) < ONE_MINUTE) return translation.NOW;

  const {
    FUTURE_PLURAL,
    FUTURE_SINGULAR,
    PAST_SINGULAR,
    PAST_PLURAL,
  } = translation[unitName];

  const isFuture = diff < 0;

  const isSingular = val <= 1;

  if (isFuture) return isSingular ? FUTURE_SINGULAR : FUTURE_PLURAL;

  return isSingular ? PAST_SINGULAR : PAST_PLURAL;
};

const firstGreaterOrMax = (diff, max) => (unit) =>
  Math.abs(diff) < unit.max || (max && unit.name === max);

export const humanize = (locale) => (date, max) => {
  const diff = Date.now() - date.getTime();

  const unit = UNITS.find(firstGreaterOrMax(diff, max)) || YEAR;

  return translate(diff, unit, locale);
};

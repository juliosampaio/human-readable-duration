import { withTranslationProxy } from './locales';
import { ONE_MINUTE, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR } from './units';

const UNITS_BY_SIZE = [MINUTE, HOUR, DAY, WEEK, MONTH, YEAR];

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

const firstGreater = (diff) => (unit) => Math.abs(diff) < unit.max;

export const humanize = (locale) => (date) => {
  const diff = Date.now() - date.getTime();

  const unit = UNITS_BY_SIZE.find(firstGreater(diff));

  return translate(diff, unit, locale);
};

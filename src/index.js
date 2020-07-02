import { withTranslationProxy } from './locales';
import { ONE_MINUTE, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR } from './units';

const UNITS_BY_SIZE = [MINUTE, HOUR, DAY, WEEK, MONTH, YEAR];

const translate = (diff, { min, name: unitName }, locale, isAs) => {
  const val = Math.round(Math.abs(diff) / min);

  const translation = withTranslationProxy(locale, unitName, val);

  if (Math.abs(diff) < ONE_MINUTE) return translation.NOW;

  const {
    FUTURE_PLURAL,
    FUTURE_SINGULAR,
    PAST_SINGULAR,
    PAST_PLURAL,
    FUTURE_SINGULAR_LESS_THAN,
    PAST_SINGULAR_LESS_THAN,
  } = translation[unitName];

  const isFuture = diff < 0;

  const isSingular = val <= 1;

  if (isFuture)
    return isSingular
      ? isAs
        ? FUTURE_SINGULAR_LESS_THAN
        : FUTURE_SINGULAR
      : FUTURE_PLURAL;

  return isSingular
    ? isAs
      ? PAST_SINGULAR_LESS_THAN
      : PAST_SINGULAR
    : PAST_PLURAL;
};

const firstGreater = (diff) => (unit) => Math.abs(diff) < unit.max;

const getDiffFromNow = (date) => Date.now() - date.getTime();

const buildAsUnit = (unit, locale) => (date) => {
  const diff = getDiffFromNow(date);
  return translate(diff, unit, locale, true);
};

export const humanize = (locale) => ({
  translate(date) {
    const diff = getDiffFromNow(date);
    const unit = UNITS_BY_SIZE.find(firstGreater(diff));
    return translate(diff, unit, locale);
  },
  asMinutes: buildAsUnit(MINUTE, locale),
  asHours: buildAsUnit(HOUR, locale),
  asDays: buildAsUnit(DAY, locale),
  asWeeks: buildAsUnit(WEEK, locale),
  asMonths: buildAsUnit(MONTH, locale),
  asYears: buildAsUnit(YEAR, locale),
});

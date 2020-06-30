import { enUS } from './en-US';

import { MINUTE, HOUR, DAY, WEEK, YEAR } from '../units';

const AVAILABLE_UNITS = [MINUTE, HOUR, DAY, WEEK, YEAR].map(
  (unit) => unit.name,
);

const withUnitTranslationProxy = (unit, val, unitName, defaultLocale) => {
  const handler = {
    get: (target, prop) => {
      const translation = target[prop] || defaultLocale[unitName][prop];
      return translation.replace(/\{0\}/, val);
    },
  };
  return new Proxy(unit, handler);
};

export const withTranslationProxy = (locale = enUS, unitName, val) => {
  const handler = {
    get: (target, prop) => {
      if (!AVAILABLE_UNITS.includes(prop)) return target[prop];

      const unit = target[prop] || enUS[prop];

      return withUnitTranslationProxy(unit, val, unitName, enUS);
    },
  };
  return new Proxy(locale, handler);
};

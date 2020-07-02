import { humanize } from '../src/index';
import { add } from './utils';
import { enUS } from '../src/locales/en-US';
import { ONE_HOUR } from '../src/units';
import { ptBR } from '../src/locales/pt-BR';

const replaceVal = (str, val) => str.replace(/\{0\}/, val);

const locales = [enUS, ptBR];

describe('humanize', () => {
  locales.forEach((locale) => {
    describe(`in ${locale.abbr}`, () => {
      const { translate } = humanize(locale);
      describe('duration in hours when in', () => {
        describe('past', () => {
          describe('singular', () => {
            it(`should return '${locale.HOUR.PAST_SINGULAR}' when duration is within one hour in the past`, () => {
              const lastHour = add(-1, ONE_HOUR);
              expect(translate(lastHour)).toBe(locale.HOUR.PAST_SINGULAR);
            });
          });
          describe('plural', () => {
            it(`should return '${locale.HOUR.PAST_PLURAL}' when duration is more than one hour in the past`, () => {
              const twoHoursInThePast = add(-2, ONE_HOUR);
              expect(translate(twoHoursInThePast)).toBe(
                replaceVal(locale.HOUR.PAST_PLURAL, 2),
              );
            });
          });
        });

        describe('future', () => {
          describe('singular', () => {
            it(`should return '${locale.HOUR.FUTURE_SINGULAR}' when duration is within one hour in the future`, () => {
              const oneHourInFuture = add(1, ONE_HOUR);
              expect(translate(oneHourInFuture)).toBe(
                locale.HOUR.FUTURE_SINGULAR,
              );
            });
          });
          describe('plural', () => {
            it(`should return '${locale.HOUR.FUTURE_PLURAL}' when duration is more than one hour in the future`, () => {
              const twoHoursInFuture = add(2, ONE_HOUR);
              expect(translate(twoHoursInFuture)).toBe(
                replaceVal(locale.HOUR.FUTURE_PLURAL, 2),
              );

              const _19hoursInFuture = add(19, ONE_HOUR);
              expect(translate(_19hoursInFuture)).toBe(
                replaceVal(locale.HOUR.FUTURE_PLURAL, 19),
              );
            });
          });
        });
      });
    });
  });
});

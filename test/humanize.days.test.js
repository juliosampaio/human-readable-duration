import { humanize } from '../src/index';
import { add } from './utils';
import { enUS } from '../src/locales/en-US';
import { ONE_DAY } from '../src/units';
import { ptBR } from '../src/locales/pt-BR';

const replaceVal = (str, val) => str.replace(/\{0\}/, val);

const locales = [enUS, ptBR];

describe('humanize', () => {
  locales.forEach((locale) => {
    describe(`in ${locale.abbr}`, () => {
      const { translate } = humanize(locale);
      describe('duration in days when in', () => {
        describe('past', () => {
          describe('singular', () => {
            it(`should return '${locale.DAY.PAST_SINGULAR}' when duration is within one day in the past`, () => {
              const lastHour = add(-1, ONE_DAY);
              expect(translate(lastHour)).toBe(locale.DAY.PAST_SINGULAR);
            });
          });
          describe('plural', () => {
            it(`should return '${locale.DAY.PAST_PLURAL}' when duration is more than one day in the past`, () => {
              const twodaysInThePast = add(-2, ONE_DAY);
              expect(translate(twodaysInThePast)).toBe(
                replaceVal(locale.DAY.PAST_PLURAL, 2),
              );
            });
          });
        });

        describe('future', () => {
          describe('singular', () => {
            it(`should return '${locale.DAY.FUTURE_SINGULAR}' when duration is within one day in the future`, () => {
              const oneHourInFuture = add(1, ONE_DAY);
              expect(translate(oneHourInFuture)).toBe(
                locale.DAY.FUTURE_SINGULAR,
              );
            });
          });
          describe('plural', () => {
            it(`should return '${locale.DAY.FUTURE_PLURAL}' when duration is more than one day in the future`, () => {
              const twodaysInFuture = add(2, ONE_DAY);
              expect(translate(twodaysInFuture)).toBe(
                replaceVal(locale.DAY.FUTURE_PLURAL, 2),
              );

              const _6DaysInFuture = add(5, ONE_DAY);
              expect(translate(_6DaysInFuture)).toBe(
                replaceVal(locale.DAY.FUTURE_PLURAL, 5),
              );
            });
          });
        });
      });
    });
  });
});

import { humanize } from '../src/index';
import { add } from './utils';
import { enUS } from '../src/locales/en-US';
import { ONE_MONTH } from '../src/units';
import { ptBR } from '../src/locales/pt-BR';

const replaceVal = (str, val) => str.replace(/\{0\}/, val);

const locales = [enUS, ptBR];

describe('humanize', () => {
  locales.forEach((locale) => {
    describe(`in ${locale.abbr}`, () => {
      const translate = humanize(locale);
      describe('duration in months when in', () => {
        describe('past', () => {
          describe('singular', () => {
            it(`should return '${locale.MONTH.PAST_SINGULAR}' when duration is within one month in the past`, () => {
              const lastMonth = add(-1, ONE_MONTH);
              expect(translate(lastMonth)).toBe(locale.MONTH.PAST_SINGULAR);
            });
          });
          describe('plural', () => {
            it(`should return '${locale.MONTH.PAST_PLURAL}' when duration is more than one month in the past`, () => {
              const twoMonthsInThePast = add(-2, ONE_MONTH);
              expect(translate(twoMonthsInThePast)).toBe(
                replaceVal(locale.MONTH.PAST_PLURAL, 2),
              );
            });
          });
        });

        describe('future', () => {
          describe('singular', () => {
            it(`should return '${locale.MONTH.FUTURE_SINGULAR}' when duration is within one month in the future`, () => {
              const oneMonthInFuture = add(1, ONE_MONTH);
              expect(translate(oneMonthInFuture)).toBe(
                locale.MONTH.FUTURE_SINGULAR,
              );
            });
          });
          describe('plural', () => {
            it(`should return '${locale.MONTH.FUTURE_PLURAL}' when duration is more than one month in the future`, () => {
              const twoMonthsInFuture = add(2, ONE_MONTH);
              expect(translate(twoMonthsInFuture)).toBe(
                replaceVal(locale.MONTH.FUTURE_PLURAL, 2),
              );

              const _3MonthsInFuture = add(3, ONE_MONTH);
              expect(translate(_3MonthsInFuture)).toBe(
                replaceVal(locale.MONTH.FUTURE_PLURAL, 3),
              );
            });
          });
        });
      });
    });
  });
});

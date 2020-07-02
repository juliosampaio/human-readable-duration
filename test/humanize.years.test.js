import { humanize } from '../src/index';
import { add } from './utils';
import { enUS } from '../src/locales/en-US';
import { ONE_YEAR } from '../src/units';
import { ptBR } from '../src/locales/pt-BR';

const replaceVal = (str, val) => str.replace(/\{0\}/, val);

const locales = [enUS, ptBR];

describe('humanize', () => {
  locales.forEach((locale) => {
    describe(`in ${locale.abbr}`, () => {
      const { translate } = humanize(locale);
      describe('duration in Years when in', () => {
        describe('past', () => {
          describe('singular', () => {
            it(`should return '${locale.YEAR.PAST_SINGULAR}' when duration is within one year in the past`, () => {
              const lastMonth = add(-1, ONE_YEAR);
              expect(translate(lastMonth)).toBe(locale.YEAR.PAST_SINGULAR);
            });
          });
          describe('plural', () => {
            it(`should return '${locale.YEAR.PAST_PLURAL}' when duration is more than one year in the past`, () => {
              const twoYearsInThePast = add(-2, ONE_YEAR);
              expect(translate(twoYearsInThePast)).toBe(
                replaceVal(locale.YEAR.PAST_PLURAL, 2),
              );
            });
          });
        });

        describe('future', () => {
          describe('singular', () => {
            it(`should return '${locale.YEAR.FUTURE_SINGULAR}' when duration is within one year in the future`, () => {
              const oneMonthInFuture = add(1, ONE_YEAR);
              expect(translate(oneMonthInFuture)).toBe(
                locale.YEAR.FUTURE_SINGULAR,
              );
            });
          });
          describe('plural', () => {
            it(`should return '${locale.YEAR.FUTURE_PLURAL}' when duration is more than one year in the future`, () => {
              const twoYearsInFuture = add(2, ONE_YEAR);
              expect(translate(twoYearsInFuture)).toBe(
                replaceVal(locale.YEAR.FUTURE_PLURAL, 2),
              );

              const _3YearsInFuture = add(3, ONE_YEAR);
              expect(translate(_3YearsInFuture)).toBe(
                replaceVal(locale.YEAR.FUTURE_PLURAL, 3),
              );
            });
          });
        });
      });
    });
  });
});

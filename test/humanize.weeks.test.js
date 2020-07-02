import { humanize } from '../src/index';
import { add } from './utils';
import { enUS } from '../src/locales/en-US';
import { ONE_WEEK } from '../src/units';
import { ptBR } from '../src/locales/pt-BR';

const replaceVal = (str, val) => str.replace(/\{0\}/, val);

const locales = [enUS, ptBR];

describe('humanize', () => {
  locales.forEach((locale) => {
    describe(`in ${locale.abbr}`, () => {
      const { translate } = humanize(locale);
      describe('duration in weeks when in', () => {
        describe('past', () => {
          describe('singular', () => {
            it(`should return '${locale.WEEK.PAST_SINGULAR}' when duration is within one week in the past`, () => {
              const lastWeek = add(-1, ONE_WEEK);
              expect(translate(lastWeek)).toBe(locale.WEEK.PAST_SINGULAR);
            });
          });
          describe('plural', () => {
            it(`should return '${locale.WEEK.PAST_PLURAL}' when duration is more than one week in the past`, () => {
              const twoWeeksInThePast = add(-2, ONE_WEEK);
              expect(translate(twoWeeksInThePast)).toBe(
                replaceVal(locale.WEEK.PAST_PLURAL, 2),
              );
            });
          });
        });

        describe('future', () => {
          describe('singular', () => {
            it(`should return '${locale.WEEK.FUTURE_SINGULAR}' when duration is within one week in the future`, () => {
              const oneWeekInFuture = add(1, ONE_WEEK);
              expect(translate(oneWeekInFuture)).toBe(
                locale.WEEK.FUTURE_SINGULAR,
              );
            });
          });
          describe('plural', () => {
            it(`should return '${locale.WEEK.FUTURE_PLURAL}' when duration is more than one week in the future`, () => {
              const twoWeeksInFuture = add(2, ONE_WEEK);
              expect(translate(twoWeeksInFuture)).toBe(
                replaceVal(locale.WEEK.FUTURE_PLURAL, 2),
              );

              const _3weeksInFuture = add(3, ONE_WEEK);
              expect(translate(_3weeksInFuture)).toBe(
                replaceVal(locale.WEEK.FUTURE_PLURAL, 3),
              );
            });
          });
        });
      });
    });
  });
});

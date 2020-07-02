import { humanize } from '../src/index';
import { add } from './utils';
import { enUS } from '../src/locales/en-US';
import { ONE_MINUTE } from '../src/units';
import { ptBR } from '../src/locales/pt-BR';

const replaceVal = (str, val) => str.replace(/\{0\}/, val);

const locales = [enUS, ptBR];

describe('humanize', () => {
  locales.forEach((locale) => {
    describe(`in ${locale.abbr}`, () => {
      const { translate } = humanize(locale);
      describe('duration in minutes when in', () => {
        describe('present', () => {
          it(`should return '${locale.NOW}' when duration is less than one minute`, () => {
            const justNow = new Date();
            expect(translate(justNow)).toBe(locale.NOW);
          });
        });

        describe('past', () => {
          describe('singular', () => {
            it(`should return '${locale.MINUTE.PAST_SINGULAR}' when duration is within one minute in the past`, () => {
              const oneMinuteInPast = add(-1, ONE_MINUTE);
              expect(translate(oneMinuteInPast)).toBe(
                locale.MINUTE.PAST_SINGULAR,
              );
            });
          });
          describe('plural', () => {
            it(`should return '${locale.MINUTE.PAST_PLURAL}' when duration is more than one minute in the past`, () => {
              const twoMinutesInThePast = add(-2, ONE_MINUTE);
              expect(translate(twoMinutesInThePast)).toBe(
                replaceVal(locale.MINUTE.PAST_PLURAL, 2),
              );
            });
          });
        });

        describe('future', () => {
          describe('singular', () => {
            it(`should return '${locale.MINUTE.FUTURE_SINGULAR}' when duration is within one minute in the future`, () => {
              const oneMinuteInFuture = add(1, ONE_MINUTE);
              expect(translate(oneMinuteInFuture)).toBe(
                locale.MINUTE.FUTURE_SINGULAR,
              );
            });
          });
          describe('plural', () => {
            it(`should return '${locale.MINUTE.FUTURE_PLURAL}' when duration is more than one minute in the future`, () => {
              const twoMinutesInFuture = add(2, ONE_MINUTE);
              expect(translate(twoMinutesInFuture)).toBe(
                replaceVal(locale.MINUTE.FUTURE_PLURAL, 2),
              );

              const _44MinutesInFuture = add(44, ONE_MINUTE);
              expect(translate(_44MinutesInFuture)).toBe(
                replaceVal(locale.MINUTE.FUTURE_PLURAL, 44),
              );
            });
          });
        });
      });
    });
  });
});

import { humanize } from '../src';
import { enUS } from '../src/locales/en-US';
import { ptBR } from '../src/locales/pt-BR';
import { add } from './utils';
import { ONE_MINUTE } from '../src/units';

describe('locales', () => {
  it('should use default locale when no locale is specified', () => {
    const { translate } = humanize();

    expect(translate(new Date())).toBe(enUS.NOW);
  });
  it('should use the specified locale when given one', () => {
    const { translate } = humanize(ptBR);
    expect(translate(new Date())).toBe(ptBR.NOW);
  });
  it('should fallback to default locale when missing any translation key', () => {
    const esES = { abbr: 'es-es', MINUTE: { FUTURE_SINGULAR: 'en un minuto' } };
    const { translate } = humanize(esES);
    expect(translate(new Date())).toBe(enUS.NOW);
    const inOneMinute = add(1, ONE_MINUTE);
    expect(translate(inOneMinute)).toBe(esES.MINUTE.FUTURE_SINGULAR);
    const inTwoMinutes = add(2, ONE_MINUTE);
    expect(translate(inTwoMinutes)).toBe(
      enUS.MINUTE.FUTURE_PLURAL.replace(/\{0\}/, 2),
    );
  });
});

import { abbreviateName } from './abbreviate-name';

describe('abbreviateName', () => {
  it('abbreviates a name by shortening the first name to its initial followed by a period', () => {
    expect(abbreviateName('Max Mustermann')).toBe('M. Mustermann');
    expect(abbreviateName('Vorname Nachname')).toBe('V. Nachname');
  });
  it('also works for Names with multiple parts', () => {
    expect(abbreviateName('Max Moritz Mustermann')).toBe('M. Moritz Mustermann');
    expect(abbreviateName('Vorname Nachname Zweiter')).toBe('V. Nachname Zweiter');
  });
  it('returns an empty string for an empty input', () => {
    expect(abbreviateName('')).toBe('');
  });
  it('works with umlaute', () => {
    expect(abbreviateName('Änne Müller')).toBe('Ä. Müller');
    expect(abbreviateName('Özil Mustermann')).toBe('Ö. Mustermann');
  });
});

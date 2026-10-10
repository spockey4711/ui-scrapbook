import { cleanDisplayName } from './cleanDisplayName';

describe('cleanDisplayName', () => {
  it('should remove whitespace at the start and the end of the string', () => {
    expect(cleanDisplayName('  Max Mustermann  ')).toBe('max mustermann');
  });
  it('should convert multiple whitespace characters into a single space', () => {
    expect(cleanDisplayName('Max   Mustermann')).toBe('max mustermann');
  });
  it('should convert the string to lowercase', () => {
    expect(cleanDisplayName('Max MUSterManN')).toBe('max mustermann');
  });
  it('should return an empty string for an empty input', () => {
    expect(cleanDisplayName('')).toBe('');
  });
});

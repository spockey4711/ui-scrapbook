import { wordCount } from './word-count';

describe('wordCount', () => {
  it('should count words in a String', () => {
    const result = wordCount('These are four Words');

    expect(result).toBe(4);
  });

  it('should return 0 for an empty string', () => {
    const result = wordCount('');

    expect(result).toBe(0);
  });

  it('should handle extra spaces', () => {
    const result = wordCount('  These  are    four  words');

    expect(result).toBe(4);
  });
});

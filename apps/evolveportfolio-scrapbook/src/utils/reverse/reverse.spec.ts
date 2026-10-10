import { reverse } from './reverse';

describe('reverse', () => {
  it('should put "Hello" in reverse', () => {
    const solution = reverse('Hello');

    expect(solution).toBe('olleH');
  });

  it('should put "Project Evolve" in reverse', () => {
    const solution2 = reverse('Project Evolve');

    expect(solution2).toBe('evlovE tcejorP');
  });

  it('should leave "" as it is', () => {
    const solution3 = reverse('');

    expect(solution3).toBe('');
  });
});

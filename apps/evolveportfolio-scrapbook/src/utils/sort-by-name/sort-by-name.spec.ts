import { sortByLastName } from './sort-by-name';

const testfall1 = [
  { firstName: 'Max', lastName: 'Mustermann' },
  { firstName: 'Bernd', lastName: 'Brot' },
  { firstName: 'Hans', lastName: 'Meier' },
];

const expected1 = [
  { firstName: 'Bernd', lastName: 'Brot' },
  { firstName: 'Hans', lastName: 'Meier' },
  { firstName: 'Max', lastName: 'Mustermann' },
];

const testfall2 = [
  { firstName: 'Max', lastName: 'Mustermann' },
  { firstName: 'Bernd', lastName: 'Mustermann' },
  { firstName: 'Hans', lastName: 'Mustermann' },
];

const expected2 = [
  { firstName: 'Bernd', lastName: 'Mustermann' },
  { firstName: 'Hans', lastName: 'Mustermann' },
  { firstName: 'Max', lastName: 'Mustermann' },
];

const testfall3 = [
  { firstName: 'Max', lastName: 'Peters' },
  { firstName: 'Bernd', lastName: 'Özdemir' },
  { firstName: 'Hans', lastName: 'Otto' },
];

const expected3 = [
  { firstName: 'Hans', lastName: 'Otto' },
  { firstName: 'Bernd', lastName: 'Özdemir' },
  { firstName: 'Max', lastName: 'Peters' },
];

describe('sortByLastName', () => {
  it('sorts by last name alphabetically.', () => {
    expect(sortByLastName(testfall1)).toEqual(expected1);
  });

  it('sorts by first name if last name is equal', () => {
    expect(sortByLastName(testfall2)).toEqual(expected2);
  });

  it('also works for vowel mutations', () => {
    expect(sortByLastName(testfall3)).toEqual(expected3);
  });
});

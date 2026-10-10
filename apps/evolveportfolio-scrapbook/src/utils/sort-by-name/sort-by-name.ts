/** Anything with a first and last name, e.g. a team member. */
export interface Named {
  firstName: string;
  lastName: string;
}

/**
 * Sorts a list alphabetically by last name, then by first name if last names are equal.
 * Umlauts are ordered by German rules, case is ignored.
 * The original list is not modified.
 */
export function sortByLastName<T extends Named>(people: readonly T[]): T[] {
  const compare = new Intl.Collator('de', { sensitivity: 'base' }).compare;

  return [...people].sort(
    (a, b) =>
      compare(a.lastName.trim(), b.lastName.trim()) ||
      compare(a.firstName.trim(), b.firstName.trim()),
  );
}

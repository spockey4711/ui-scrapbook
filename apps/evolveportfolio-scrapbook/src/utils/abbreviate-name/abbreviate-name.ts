export function abbreviateName(name: string): string {
  const [firstName, ...remainingNames] = name.trim().split(/\s+/);

  if (!firstName) {
    return '';
  }

  return [`${firstName[0]}.`, ...remainingNames].join(' ');
}

/* The function cleanDisplayName converts a display name into a clean format by doing the following:
    - Removing any whitespace characters at the start and the end of the string
    - Converting multiple whitespace characters into a single space
    - Converting the string to lowercase
*/
export function cleanDisplayName(displayName: string): string {
  return displayName.trim().toLowerCase().replace(/\s+/g, ' ');
}

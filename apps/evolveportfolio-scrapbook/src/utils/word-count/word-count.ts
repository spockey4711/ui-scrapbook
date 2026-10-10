export function wordCount(text: string): number {
  const cleanedText = text.trim();
  if (cleanedText === '') {
    return 0;
  }
  const words = cleanedText.split(/\s+/);
  return words.length;
}

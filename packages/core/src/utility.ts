export function isSafeDirectoryName(dirName: string) {
  const invalidChars = /[/\\?*<>|":]/;
  return typeof dirName === 'string' && dirName.trim() !== '' && !invalidChars.test(dirName);
}
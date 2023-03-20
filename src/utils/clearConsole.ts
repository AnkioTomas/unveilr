export function clearConsole(toStart?: boolean): void {
  process.stdout.write('\u001b[2J')
  process.stdout.write('\u001b[1;1H')
  toStart && process.stdout.write('\u001b[3J')
}

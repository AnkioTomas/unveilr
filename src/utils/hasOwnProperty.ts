export function hasOwnProperty<T extends object>(o: T, name: keyof T): boolean {
  return Object.prototype.hasOwnProperty.call(o, name)
}

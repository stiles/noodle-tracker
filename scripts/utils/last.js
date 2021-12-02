/**
 * Gets the last element of `array`.
 *
 * @param {any[]} array The array to query.
 * @returns {any} Returns the last element of `array`.
 * @example
 *
 * last([1, 2, 3]);
 * // => 3
 */
export function last(array) {
  const length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

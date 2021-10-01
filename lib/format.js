/**
 * Formats a integer to Brazilian Real, with the last digits as the cents.
 * @param {number} value Value to be formatted
 * @returns {string} Formatted value
 */
export const formatCurrency = (value) => {
  typeof value !== "number" &&
    new Error(`Expected "number", received ${typeof number}`);

  const str = value.toString();
  const head = str.slice(0, str.length - 2);
  const tail = str.slice(-2);

  return `R$ ${head},${tail}`;
};

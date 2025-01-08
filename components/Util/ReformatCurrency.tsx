// Utility function to safely scale USD input to USDC (1e6 precision)

export const CURRENCY_FACTOR = 1e6;

/**
 * Scales a numeric input (USD) to USDC format with 6 decimals.
 * Ensures the input is a valid number before scaling.
 *
 * @param input - The value entered by the user.
 * @returns The scaled value in USDC format, or null if invalid.
 */
export function reformatCurrency(input: string | number): number | null {
  const value = Number(input);
  if (isNaN(value) || value < 0) {
    console.error('Invalid input for scaling:', input);
    return null;
  }
  return Math.round(value * CURRENCY_FACTOR);
}

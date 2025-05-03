/**
 * Unit tests for the calculateTotalCost utility function
 */

/**
 * Calculates the total cost based on price per hour and usage hours
 * @param {number} pricePerHour - The hourly price of the resource
 * @param {number} usageHours - The number of hours the resource will be used
 * @returns {number} - The total cost
 */
function calculateTotalCost(pricePerHour, usageHours) {
  return pricePerHour * usageHours;
}

// Mock test suite
describe('calculateTotalCost', () => {
  it('should correctly calculate total cost based on hourly price and usage hours', () => {
    // Test cases
    expect(calculateTotalCost(10, 5)).toBe(50);
    expect(calculateTotalCost(2.5, 4)).toBe(10);
    expect(calculateTotalCost(0, 10)).toBe(0);
    
    // Test with larger numbers
    expect(calculateTotalCost(24.99, 720)).toBe(17992.8);
    
    // Test with floating point numbers
    expect(calculateTotalCost(0.0512, 168)).toBeCloseTo(8.6016);
  });
  
  it('should handle edge cases', () => {
    // Test with zero hours
    expect(calculateTotalCost(10, 0)).toBe(0);
    
    // Test with negative hours (should not occur in real usage)
    expect(calculateTotalCost(10, -5)).toBe(-50);
    
    // Test with negative price (should not occur in real usage)
    expect(calculateTotalCost(-10, 5)).toBe(-50);
  });
});
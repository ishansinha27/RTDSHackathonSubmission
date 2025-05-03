# Testing

This directory contains tests for the AceCloud GPU Resource Finder application.

## Test Structure

- `unit/`: Unit tests for individual components and functions
- `integration/`: Integration tests for API endpoints and component interactions
- `e2e/`: End-to-end tests for complete user flows

## Running Tests

To run tests, use the following command:

```bash
npm test
```

For running specific test suites:

```bash
npm test -- unit
npm test -- integration
npm test -- e2e
```

## Writing Tests

### Unit Tests

Unit tests should focus on testing individual functions and components in isolation. Mock any external dependencies.

Example:

```javascript
// tests/unit/utils.test.js
import { calculateTotalCost } from '../../client/src/lib/utils';

describe('calculateTotalCost', () => {
  it('should correctly calculate total cost based on hourly price and usage hours', () => {
    expect(calculateTotalCost(10, 5)).toBe(50);
    expect(calculateTotalCost(2.5, 4)).toBe(10);
    expect(calculateTotalCost(0, 10)).toBe(0);
  });
});
```

### Integration Tests

Integration tests should focus on testing API endpoints and component interactions.

Example:

```javascript
// tests/integration/api.test.js
import axios from 'axios';

describe('Resources API', () => {
  it('should return resources based on search criteria', async () => {
    const response = await axios.get('/api/resources', {
      params: {
        region: 'us-east-at-1',
        budget: 500,
        operatingSystem: 'linux',
        usageHours: 80
      }
    });

    expect(response.status).toBe(200);
    expect(response.data.error).toBe(false);
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});
```

### End-to-End Tests

End-to-end tests should simulate real user interactions and test complete user flows.

Example:

```javascript
// tests/e2e/search.test.js
describe('GPU Search Flow', () => {
  it('should allow users to search for GPU resources', async () => {
    // Visit the homepage
    await page.goto('http://localhost:5000');

    // Fill out the search form
    await page.select('select[name="region"]', 'us-east-at-1');
    await page.type('input[name="budget"]', '500');
    await page.select('select[name="operatingSystem"]', 'linux');
    await page.type('input[name="usageHours"]', '80');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for results to load
    await page.waitForSelector('.resource-card');

    // Check if results are displayed
    const resourceCards = await page.$$('.resource-card');
    expect(resourceCards.length).toBeGreaterThan(0);
  });
});
```

## Test Coverage

We aim to maintain at least 80% test coverage across the codebase. To check the current test coverage, run:

```bash
npm run test:coverage
```

## Continuous Integration

All tests are automatically run on GitHub Actions when pull requests are created or updated. Pull requests cannot be merged if tests are failing.
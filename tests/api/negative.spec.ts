
import { test, expect } from '@playwright/test';

test.describe('Advanced API Negative Tests', () => {

  // 1. Invalid endpoint
  test('GET - Verify invalid endpoint returns 404', async ({ request }) => {
    const response = await request.get('invalid-endpoint');

    expect(response.status()).toBe(404);
  });

  // 2. Invalid product ID
  test('GET - Verify invalid product ID', async ({ request }) => {
    const response = await request.get('products/999999');

    expect([400, 404]).toContain(response.status());
  });

  // 3. Invalid HTTP method
  test('POST - Verify unsupported endpoint', async ({ request }) => {
    const response = await request.post('invalid-endpoint', {
      data: {
        name: 'Test Product',
      },
    });

    expect(response.status()).toBe(404);
  });

});

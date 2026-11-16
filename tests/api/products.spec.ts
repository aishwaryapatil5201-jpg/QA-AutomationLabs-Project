
import { test, expect } from '@playwright/test';

test.describe('Products API Tests', () => {

  test('GET - Retrieve all products', async ({ request }) => {
    const response = await request.get('products');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET - Retrieve product by ID', async ({ request }) => {
    const response = await request.get('products/1');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data).toBeDefined();
    expect(body.data.id).toBe(1);
  });

  test('GET - Verify product response time', async ({ request }) => {
    const startTime = Date.now();

    const response = await request.get('products');

    const responseTime = Date.now() - startTime;

    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(3000);
  });

});

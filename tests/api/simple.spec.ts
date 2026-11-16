
import { test, expect } from '@playwright/test';

const endpoints = [
  'status',
  'stats',
  'products',
  'products/1',
  'users',
  'users/1',
  'orders',
  'customers',
  'books',
  'carts'
];

test.describe('Basic API GET Tests', () => {

  for (const endpoint of endpoints) {

    test(`GET - Verify ${endpoint}`, async ({ request }) => {

      const response = await request.get(endpoint);

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body).toBeDefined();

    });

  }

});

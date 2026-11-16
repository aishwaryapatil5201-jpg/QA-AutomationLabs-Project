
import { test, expect } from '@playwright/test';
import { healthResponseSchema } from './schemas/health.schema';

test('Verify API health status with schema validation', async ({ request }) => {

  // 1. Send GET request
  const response = await request.get('status');

  // 2. Verify HTTP status code
  expect(response.status()).toBe(200);

  // 3. Verify response content type
  expect(response.headers()['content-type']).toContain('application/json');

  // 4. Read response body
  const responseBody = await response.json();

  // 5. Validate response schema using Zod
  const validation = healthResponseSchema.safeParse(responseBody);

  // 6. Verify schema validation
  expect(
    validation.success,
    JSON.stringify(validation.error?.format(), null, 2)
  ).toBe(true);

  // 7. Print API response
  console.log('API Response:', responseBody);

  console.log('Health API schema validation passed!');
});


import { test, expect, APIRequestContext } from '@playwright/test';

const VALID_EMAIL = process.env.API_EMAIL;
const VALID_PASSWORD = process.env.API_PASSWORD;
const INVALID_PASSWORD = 'WrongPassword123';

if (!VALID_EMAIL || !VALID_PASSWORD) {
  throw new Error('API_EMAIL and API_PASSWORD must be set in the environment or .env');
}

// Reusable login function
async function getAccessToken(request: APIRequestContext): Promise<string> {
  const response = await request.post('auth/login', {
    data: {
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  const token = body.data.accessToken;

  expect(token).toBeTruthy();
  expect(typeof token).toBe('string');

  return token;
}

test.describe('Authentication API Tests', () => {

  // 1. Valid login
  test('POST - Login with valid credentials', async ({ request }) => {
    const response = await request.post('auth/login', {
      data: {
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data).toBeDefined();
    expect(body.data.accessToken).toBeTruthy();
    expect(typeof body.data.accessToken).toBe('string');

    // Validate JWT structure
    const token = body.data.accessToken;
    expect(token.split('.')).toHaveLength(3);
  });

  // 2. Invalid password
  test('POST - Login with invalid password', async ({ request }) => {
    const response = await request.post('auth/login', {
      data: {
        email: VALID_EMAIL,
        password: INVALID_PASSWORD,
      },
    });

    expect(response.status()).toBe(401);
  });

  // 3. Invalid email
  test('POST - Login with invalid email', async ({ request }) => {
    const response = await request.post('auth/login', {
      data: {
        email: 'invalid@demo.io',
        password: VALID_PASSWORD,
      },
    });

    expect(response.status()).toBe(401);
  });

  // 4. Missing password
  test('POST - Login without password', async ({ request }) => {
    const response = await request.post('auth/login', {
      data: {
        email: VALID_EMAIL,
      },
    });

    expect([400, 401, 422]).toContain(response.status());
  });

  // 5. Missing email
  test('POST - Login without email', async ({ request }) => {
    const response = await request.post('auth/login', {
      data: {
        password: VALID_PASSWORD,
      },
    });

    expect([400, 401, 422]).toContain(response.status());
  });

  // 6. Access profile with valid token
  test('GET - Access user profile with valid token', async ({ request }) => {
    const token = await getAccessToken(request);

    const response = await request.get('auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(200);

    const profileBody = await response.json();

    expect(profileBody.data).toBeDefined();
  });

  // 7. Access profile without token
  test('GET - Access user profile without token', async ({ request }) => {
    const response = await request.get('auth/me');

    expect(response.status()).toBe(401);
  });

  // 8. Access profile with invalid token
  test('GET - Access user profile with invalid token', async ({ request }) => {
    const response = await request.get('auth/me', {
      headers: {
        Authorization: 'Bearer invalid.token.value',
      },
    });

    expect(response.status()).toBe(401);
  });

  // 9. Access profile with malformed authorization header
  test('GET - Access user profile with malformed token header', async ({ request }) => {
    const response = await request.get('auth/me', {
      headers: {
        Authorization: 'InvalidToken',
      },
    });

    expect(response.status()).toBe(401);
  });

});

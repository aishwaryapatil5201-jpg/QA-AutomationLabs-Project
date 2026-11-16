
import { test as setup, expect } from '../../fixtures/basefixture';
import fs from 'node:fs';
import path from 'node:path';

const authFile = 'playwright/.auth/user.json';

setup('Authenticate using UI', async ({ page, loginPage }) => {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error('TEST_EMAIL and TEST_PASSWORD must be set in .env');
  }

  // Create authentication folder if it does not exist
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  // Open the UI application
  await page.goto('https://shop.qaautomationlabs.com/');

  // Login using existing Page Object Model
  await loginPage.Login(email, password);

  // Verify successful authentication
  await expect(page).toHaveURL(/shop\.php/);
  await expect(
    page.getByRole('button', { name: 'Logout' })
  ).toBeVisible();

  // Save browser authentication state
  await page.context().storageState({ path: authFile });

  console.log('UI authentication successful. Browser state saved.');
});

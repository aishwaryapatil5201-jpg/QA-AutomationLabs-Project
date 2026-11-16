# Playwright E-Commerce Automation Project

## Project Overview

This project automates end-to-end test scenarios for an e-commerce application using Playwright with TypeScript. It follows the Page Object Model (POM) design pattern to improve code reusability, maintainability, and readability.

## Tech Stack

- **Programming Language:** TypeScript
- **Automation Tool:** Playwright
- **Test Runner:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **Test Data Management:** Separate test data files
- **Reporting:** Playwright HTML Reporter
- **CI/CD:** GitHub Actions workflow

## Project Structure

```text
Playwright-Ecommerce-Automation-Project/
├── .github/
│   └── workflows/
├── fixtures/
│   └── basefixture.ts
├── pages/
│   ├── Loginpage.ts
│   ├── HomePage.ts
│   ├── ElectronicsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ConfirmPage.ts
├── test-data/
│   └── checkoutData.ts
├── tests/
│   ├── login.spec.ts
│   ├── homepage.spec.ts
│   ├── electronics.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── confirm.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Automated Test Scenarios

- Login functionality
- Homepage navigation
- Electronics category navigation
- Product selection
- Add to Cart functionality
- Cart validation
- Checkout process
- Billing address submission
- Order confirmation

## Framework Features

- Page Object Model implementation
- Custom Playwright fixtures
- Reusable page objects
- Data-driven testing
- Centralized test data management
- Playwright assertions
- HTML test reports
- Screenshots and videos on test failures
- Trace collection for debugging
- GitHub Actions workflow

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/aishwaryapatil5201-jpg/Playwright-Ecommerce-Automation-Project.git
```

Navigate to the project directory:

```bash
cd Playwright-Ecommerce-Automation-Project
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install chromium
```

## Execute Tests

Run all tests:

```bash
npx playwright test
```

Run tests on Chromium:

```bash
npx playwright test --project=chromium
```

Run tests in headed mode:

```bash
npx playwright test --project=chromium --headed
```

## View HTML Report

```bash
npx playwright show-report
```

## Application Under Test

Practice application: https://shop.qaautomationlabs.com/

## API Tests

The `api` project tests the REST playground at
https://api.qaautomationlabs.com/v1 directly through Playwright's
`APIRequestContext` — no browser is launched.

```bash
npm run test:api
```

```bash
npm run test:api -- --grep auth
```

Layout:

```text
tests/api/
├── simple.spec.ts         # short learning reference, 10 tests
├── health.spec.ts         # /status, /stats, response envelope
├── products.spec.ts       # CRUD, pagination, filtering, validation
├── auth.spec.ts           # login, bearer token, 401 handling
└── negative.spec.ts       # simulated errors, perf, error contract
```

Every test follows the same three steps:

```ts
test('name', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/path`);   // 1. ask
  expect(res.status()).toBe(200);                      // 2. check status
  const body = await res.json();                       // 3. check data
  expect(body.data.something).toBe(expected);
});
```

Run the UI suite separately with `npm run test:ui`.

**Note on the playground:** the API is stateless — `POST` returns an id
that does not persist, and seeded records reset on every request. Tests
therefore assert on the response contract rather than on read-after-write,
except where `PUT`/`PATCH`/`DELETE` echo the change back in their own
response.

## Author

Aishwarya Patil

GitHub: https://github.com/aishwaryapatil5201-jpg
Jenkins automatic build trigger testing......

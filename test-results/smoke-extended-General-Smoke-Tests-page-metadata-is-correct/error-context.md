# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke-extended.spec.js >> General Smoke Tests >> page metadata is correct
- Location: tests\smoke-extended.spec.js:65:3

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('meta[name="viewport"]')
Expected pattern: /width=device-width/
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('meta[name="viewport"]')

```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('General Smoke Tests', () => {
  4   |   test('homepage loads successfully', async ({ page }) => {
  5   |     await page.goto('/');
  6   |     await expect(page).toHaveTitle(/PHP Refresher/i);
  7   |   });
  8   | 
  9   |   test('main content sections exist', async ({ page }) => {
  10  |     await page.goto('/');
  11  |     
  12  |     const heading = page.locator('h1');
  13  |     await expect(heading).toBeVisible();
  14  |   });
  15  | 
  16  |   test('documentation index loads', async ({ page }) => {
  17  |     await page.goto('/phpRefresh/');
  18  |     
  19  |     const mainContent = page.locator('main, article, .md-content');
  20  |     await expect(mainContent).toBeVisible();
  21  |   });
  22  | 
  23  |   test('PR section is accessible', async ({ page }) => {
  24  |     await page.goto('/PR/phpVar1/');
  25  |     
  26  |     const title = await page.title();
  27  |     expect(title).toBeTruthy();
  28  |   });
  29  | 
  30  |   test('Functions section is accessible', async ({ page }) => {
  31  |     await page.goto('/Func/phpStr1/');
  32  |     
  33  |     const title = await page.title();
  34  |     expect(title).toBeTruthy();
  35  |   });
  36  | 
  37  |   test('Data Structures section is accessible', async ({ page }) => {
  38  |     await page.goto('/DS/phpArray/');
  39  |     
  40  |     const title = await page.title();
  41  |     expect(title).toBeTruthy();
  42  |   });
  43  | 
  44  |   test('Classes section is accessible', async ({ page }) => {
  45  |     await page.goto('/Classes/phpCls/');
  46  |     
  47  |     const title = await page.title();
  48  |     expect(title).toBeTruthy();
  49  |   });
  50  | 
  51  |   test('Advanced section is accessible', async ({ page }) => {
  52  |     await page.goto('/Adv/phpMySql/');
  53  |     
  54  |     const title = await page.title();
  55  |     expect(title).toBeTruthy();
  56  |   });
  57  | 
  58  |   test('Moodle section is accessible', async ({ page }) => {
  59  |     await page.goto('/Moodle/');
  60  |     
  61  |     const title = await page.title();
  62  |     expect(title).toBeTruthy();
  63  |   });
  64  | 
  65  |   test('page metadata is correct', async ({ page }) => {
  66  |     await page.goto('/PR/phpVar1/');
  67  |     
  68  |     const metaViewport = page.locator('meta[name="viewport"]');
> 69  |     await expect(metaViewport).toHaveAttribute('content', /width=device-width/);
      |                                ^ Error: expect(locator).toHaveAttribute(expected) failed
  70  |   });
  71  | 
  72  |   test('favicon is present', async ({ page }) => {
  73  |     await page.goto('/');
  74  |     
  75  |     const favicon = page.locator('link[rel="icon"]');
  76  |     const exists = await favicon.count() > 0;
  77  |     
  78  |     // Favicon is nice to have but not critical
  79  |     console.log(`Favicon present: ${exists}`);
  80  |   });
  81  | 
  82  |   test('site title is consistent', async ({ page }) => {
  83  |     const pages = ['/', '/PR/phpVar1/', '/Func/phpStr1/'];
  84  |     
  85  |     for (const testPage of pages) {
  86  |       await page.goto(testPage);
  87  |       const title = await page.title();
  88  |       
  89  |       expect(title).toContain('PHP');
  90  |     }
  91  |   });
  92  | 
  93  |   test('dark mode is available', async ({ page }) => {
  94  |     await page.goto('/');
  95  |     
  96  |     const darkModeButton = page.locator('[aria-label*="dark"], [aria-label*="theme"]').first();
  97  |     const exists = await darkModeButton.isVisible().catch(() => false);
  98  |     
  99  |     console.log(`Dark mode button available: ${exists}`);
  100 |   });
  101 | 
  102 |   test('last updated metadata is present on pages', async ({ page }) => {
  103 |     const pages = ['/PR/phpVar1/', '/Func/phpStr1/', '/DS/phpArray/'];
  104 |     
  105 |     for (const testPage of pages) {
  106 |       await page.goto(testPage);
  107 |       
  108 |       const lastUpdated = page.locator('text=Last updated:');
  109 |       const exists = await lastUpdated.isVisible().catch(() => false);
  110 |       
  111 |       console.log(`Last updated metadata present: ${exists}`);
  112 |     }
  113 |   });
  114 | });
  115 | 
```
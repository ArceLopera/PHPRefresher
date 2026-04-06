# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.js >> Responsive Design >> navigation adapts to mobile
- Location: tests\responsive.spec.js:33:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "Index of /" [level=1] [ref=e2]
  - table
  - generic [ref=e3]:
    - text: Node.js v24.14.0/
    - link "http-server" [ref=e4] [cursor=pointer]:
      - /url: https://github.com/http-party/http-server
    - text: server running @ 127.0.0.1:8000
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Responsive Design', () => {
  4   |   test('page renders on mobile (375px width)', async ({ page }) => {
  5   |     await page.setViewportSize({ width: 375, height: 812 });
  6   |     await page.goto('/');
  7   |     
  8   |     // Main content should still be accessible
  9   |     const mainContent = page.locator('main, article, .md-content');
  10  |     await expect(mainContent).toBeVisible();
  11  |     
  12  |     // No horizontal overflow
  13  |     const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  14  |     expect(bodyWidth).toBeLessThanOrEqual(375 + 20);  // Allow small margin
  15  |   });
  16  | 
  17  |   test('page renders on tablet (768px width)', async ({ page }) => {
  18  |     await page.setViewportSize({ width: 768, height: 1024 });
  19  |     await page.goto('/');
  20  |     
  21  |     const mainContent = page.locator('main, article, .md-content');
  22  |     await expect(mainContent).toBeVisible();
  23  |   });
  24  | 
  25  |   test('page renders on desktop (1280px width)', async ({ page }) => {
  26  |     await page.setViewportSize({ width: 1280, height: 800 });
  27  |     await page.goto('/');
  28  |     
  29  |     const mainContent = page.locator('main, article, .md-content');
  30  |     await expect(mainContent).toBeVisible();
  31  |   });
  32  | 
  33  |   test('navigation adapts to mobile', async ({ page }) => {
  34  |     await page.setViewportSize({ width: 375, height: 812 });
  35  |     await page.goto('/');
  36  |     
  37  |     const mobileMenuButton = page.locator('[aria-label*="menu"], .md-nav__button').first();
  38  |     const isMobileMenuVisible = await mobileMenuButton.isVisible().catch(() => false);
  39  |     
  40  |     // Either menu button exists or nav is visible
  41  |     const navVisible = await page.locator('.md-nav').isVisible().catch(() => false);
> 42  |     expect(isMobileMenuVisible || navVisible).toBe(true);
      |                                               ^ Error: expect(received).toBe(expected) // Object.is equality
  43  |   });
  44  | 
  45  |   test('code blocks are readable on mobile', async ({ page }) => {
  46  |     await page.setViewportSize({ width: 375, height: 812 });
  47  |     await page.goto('/PR/phpVar1/');
  48  |     
  49  |     const codeBlocks = await page.locator('pre').count();
  50  |     if (codeBlocks > 0) {
  51  |       const firstCodeBlock = page.locator('pre').first();
  52  |       const isVisible = await firstCodeBlock.isVisible();
  53  |       expect(isVisible).toBe(true);
  54  |       
  55  |       // Should have horizontal scroll if needed
  56  |       const scrollWidth = await firstCodeBlock.evaluate(el => el.scrollWidth);
  57  |       const clientWidth = await firstCodeBlock.evaluate(el => el.clientWidth);
  58  |       expect(clientWidth).toBeGreaterThan(0);
  59  |     }
  60  |   });
  61  | 
  62  |   test('tables are responsive', async ({ page }) => {
  63  |     await page.setViewportSize({ width: 375, height: 812 });
  64  |     await page.goto('/Classes/phpCls/');
  65  |     
  66  |     const tables = await page.locator('table').count();
  67  |     if (tables > 0) {
  68  |       const table = page.locator('table').first();
  69  |       await expect(table).toBeVisible();
  70  |     }
  71  |   });
  72  | 
  73  |   test('images scale appropriately', async ({ page }) => {
  74  |     await page.setViewportSize({ width: 375, height: 812 });
  75  |     await page.goto('/');
  76  |     
  77  |     const images = await page.locator('img').all();
  78  |     
  79  |     for (const img of images.slice(0, 3)) {
  80  |       const isVisible = await img.isVisible();
  81  |       if (isVisible) {
  82  |         const width = await img.boundingBox();
  83  |         expect(width.width).toBeLessThanOrEqual(375);
  84  |       }
  85  |     }
  86  |   });
  87  | 
  88  |   test('text is readable on mobile', async ({ page }) => {
  89  |     await page.setViewportSize({ width: 375, height: 812 });
  90  |     await page.goto('/');
  91  |     
  92  |     const bodyText = await page.locator('body').textContent();
  93  |     expect(bodyText).toBeTruthy();
  94  |     expect(bodyText.length).toBeGreaterThan(10);
  95  |   });
  96  | 
  97  |   test('buttons and links are touch-friendly', async ({ page }) => {
  98  |     await page.setViewportSize({ width: 375, height: 812 });
  99  |     await page.goto('/');
  100 |     
  101 |     const links = await page.locator('a').all();
  102 |     
  103 |     for (const link of links.slice(0, 5)) {
  104 |       const box = await link.boundingBox();
  105 |       if (box) {
  106 |         // Touch target should be at least 44x44px (mobile standard)
  107 |         expect(Math.max(box.width, box.height)).toBeGreaterThanOrEqual(30);
  108 |       }
  109 |     }
  110 |   });
  111 | 
  112 |   test('no layout shift on page load', async ({ page }) => {
  113 |     await page.setViewportSize({ width: 768, height: 1024 });
  114 |     await page.goto('/');
  115 |     
  116 |     const firstHeading = await page.locator('h1').first().boundingBox();
  117 |     expect(firstHeading).toBeTruthy();
  118 |     
  119 |     // Element should stay in place
  120 |     await page.waitForTimeout(1000);
  121 |     const secondMeasure = await page.locator('h1').first().boundingBox();
  122 |     expect(firstHeading.y).toBe(secondMeasure.y);
  123 |   });
  124 | });
  125 | 
```
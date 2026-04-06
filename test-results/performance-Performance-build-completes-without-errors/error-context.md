# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: performance.spec.js >> Performance >> build completes without errors
- Location: tests\performance.spec.js:26:3

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 400
Received:   404
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Performance', () => {
  4   |   test('homepage loads in reasonable time', async ({ page }) => {
  5   |     const startTime = Date.now();
  6   |     await page.goto('/');
  7   |     const loadTime = Date.now() - startTime;
  8   |     
  9   |     // Should load within 10 seconds
  10  |     expect(loadTime).toBeLessThan(10000);
  11  |     
  12  |     console.log(`Homepage loaded in ${loadTime}ms`);
  13  |   });
  14  | 
  15  |   test('documentation page loads quickly', async ({ page }) => {
  16  |     const startTime = Date.now();
  17  |     await page.goto('/PR/phpVar1/');
  18  |     const loadTime = Date.now() - startTime;
  19  |     
  20  |     // Should load within 5 seconds
  21  |     expect(loadTime).toBeLessThan(5000);
  22  |     
  23  |     console.log(`Documentation page loaded in ${loadTime}ms`);
  24  |   });
  25  | 
  26  |   test('build completes without errors', async ({ page }) => {
  27  |     // This is validated by the mkdocs build process
  28  |     // If tests run successfully, the site was built correctly
  29  |     
  30  |     // Verify main pages are accessible
  31  |     const pages = [
  32  |       '/',
  33  |       '/phpRefresh/',
  34  |       '/PR/phpVar1/',
  35  |       '/Func/phpStr1/',
  36  |       '/DS/phpArray/',
  37  |     ];
  38  |     
  39  |     for (const testPage of pages) {
  40  |       const response = await page.goto(testPage);
> 41  |       expect(response.status()).toBeLessThan(400);
      |                                 ^ Error: expect(received).toBeLessThan(expected)
  42  |     }
  43  |   });
  44  | 
  45  |   test('images are optimized', async ({ page }) => {
  46  |     await page.goto('/');
  47  |     
  48  |     const images = await page.locator('img').all();
  49  |     
  50  |     for (const img of images.slice(0, 3)) {
  51  |       const src = await img.getAttribute('src');
  52  |       expect(src).toBeTruthy();
  53  |       
  54  |       // Check if image is actually loaded
  55  |       const isLoaded = await img.evaluate(el => el.complete && el.naturalHeight > 0).catch(() => false);
  56  |       if (isLoaded !== undefined) {
  57  |         expect(isLoaded).toBe(true);
  58  |       }
  59  |     }
  60  |   });
  61  | 
  62  |   test('CSS and JS are properly minified', async ({ page }) => {
  63  |     const response = await page.goto('/');
  64  |     const resourceTiming = await page.evaluate(() => {
  65  |       return performance.getEntriesByType('resource').map(r => ({
  66  |         name: r.name,
  67  |         duration: r.duration,
  68  |         size: r.transferSize,
  69  |       }));
  70  |     });
  71  |     
  72  |     // Should have resources
  73  |     expect(resourceTiming.length).toBeGreaterThan(0);
  74  |     
  75  |     console.log(`Total resources: ${resourceTiming.length}`);
  76  |   });
  77  | 
  78  |   test('first contentful paint is quick', async ({ page }) => {
  79  |     const metrics = await page.goto('/').then(() => 
  80  |       page.evaluate(() => {
  81  |         const paintEntries = performance.getEntriesByType('paint');
  82  |         return paintEntries.find(p => p.name === 'first-contentful-paint');
  83  |       })
  84  |     );
  85  |     
  86  |     // FCP should ideally be under 2 seconds
  87  |     if (metrics) {
  88  |       console.log(`First Contentful Paint: ${metrics.startTime}ms`);
  89  |       expect(metrics.startTime).toBeLessThan(5000);
  90  |     }
  91  |   });
  92  | 
  93  |   test('no memory leaks in navigation', async ({ page }) => {
  94  |     // Navigate through multiple pages to check for memory issues
  95  |     const pages = [
  96  |       '/',
  97  |       '/PR/phpVar1/',
  98  |       '/Func/phpStr1/',
  99  |       '/Classes/phpCls/',
  100 |     ];
  101 |     
  102 |     for (const testPage of pages) {
  103 |       await page.goto(testPage);
  104 |       await page.waitForLoadState('networkidle');
  105 |     }
  106 |     
  107 |     // If we reach here without crashing, navigation is stable
  108 |     expect(true).toBe(true);
  109 |   });
  110 | 
  111 |   test('search performs efficiently', async ({ page }) => {
  112 |     await page.goto('/');
  113 |     
  114 |     const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
  115 |     
  116 |     if (await searchBox.isVisible().catch(() => false)) {
  117 |       const startTime = Date.now();
  118 |       await searchBox.fill('array');
  119 |       await page.waitForTimeout(500);
  120 |       const searchTime = Date.now() - startTime;
  121 |       
  122 |       // Search should be responsive
  123 |       expect(searchTime).toBeLessThan(2000);
  124 |     }
  125 |   });
  126 | 
  127 |   test('sidebar navigation does not cause layout thrashing', async ({ page }) => {
  128 |     await page.goto('/');
  129 |     
  130 |     // Toggle sidebar if it exists
  131 |     const sidebarButton = page.locator('[aria-label*="menu"], .md-nav__button').first();
  132 |     
  133 |     if (await sidebarButton.isVisible().catch(() => false)) {
  134 |       const measureTime = async () => {
  135 |         const start = Date.now();
  136 |         await sidebarButton.click();
  137 |         return Date.now() - start;
  138 |       };
  139 |       
  140 |       const time = await measureTime();
  141 |       expect(time).toBeLessThan(1000);
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: links.spec.js >> Link Validation >> navigation links work correctly
- Location: tests\links.spec.js:28:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
  3   | test.describe('Link Validation', () => {
  4   |   test('all internal links are valid', async ({ page }) => {
  5   |     await page.goto('/');
  6   |     
  7   |     // Get all internal links
  8   |     const links = await page.locator('a[href^="/"]').all();
  9   |     
  10  |     console.log(`Found ${links.length} internal links`);
  11  |     
  12  |     // Sample test - check that links exist and are not broken
  13  |     let checkedLinks = 0;
  14  |     for (const link of links.slice(0, 20)) {  // Test first 20 links
  15  |       const href = await link.getAttribute('href');
  16  |       if (href && !href.includes('#')) {
  17  |         await page.goto(href).catch(e => {
  18  |           console.log(`Failed to load: ${href}`);
  19  |         });
  20  |         expect(page.url()).toContain('/');
  21  |         checkedLinks++;
  22  |       }
  23  |     }
  24  |     
  25  |     expect(checkedLinks).toBeGreaterThan(0);
  26  |   });
  27  | 
  28  |   test('navigation links work correctly', async ({ page }) => {
  29  |     await page.goto('/');
  30  |     
  31  |     // Test navbar links
  32  |     const navLinks = await page.locator('.md-nav a').count();
> 33  |     expect(navLinks).toBeGreaterThan(0);
      |                      ^ Error: expect(received).toBeGreaterThan(expected)
  34  |     
  35  |     // Click first nav link and verify page loads
  36  |     const firstNavLink = page.locator('.md-nav a').first();
  37  |     const href = await firstNavLink.getAttribute('href');
  38  |     
  39  |     if (href && href.startsWith('/')) {
  40  |       await firstNavLink.click();
  41  |       await expect(page).toHaveURL(new RegExp(href));
  42  |     }
  43  |   });
  44  | 
  45  |   test('documentation links are structured correctly', async ({ page }) => {
  46  |     await page.goto('/');
  47  |     
  48  |     // Check for main documentation sections
  49  |     const sections = ['PR', 'Func', 'DS', 'Classes', 'Adv', 'Moodle'];
  50  |     
  51  |     for (const section of sections) {
  52  |       const sectionLink = page.locator(`a:has-text("${section}")`).first();
  53  |       const exists = await sectionLink.isVisible().catch(() => false);
  54  |       
  55  |       if (exists) {
  56  |         await expect(sectionLink).toBeVisible();
  57  |       }
  58  |     }
  59  |   });
  60  | 
  61  |   test('external links use HTTPS', async ({ page }) => {
  62  |     await page.goto('/');
  63  |     
  64  |     const links = await page.locator('a[href^="http"]').all();
  65  |     
  66  |     for (const link of links.slice(0, 10)) {
  67  |       const href = await link.getAttribute('href');
  68  |       expect(href).toMatch(/^https:\/\//);
  69  |     }
  70  |   });
  71  | 
  72  |   test('anchor links within page work', async ({ page }) => {
  73  |     await page.goto('/PR/phpVar1/');
  74  |     
  75  |     // Find all anchor links
  76  |     const anchorLinks = await page.locator('a[href^="#"]').count();
  77  |     
  78  |     if (anchorLinks > 0) {
  79  |       const firstAnchorLink = page.locator('a[href^="#"]').first();
  80  |       const href = await firstAnchorLink.getAttribute('href');
  81  |       
  82  |       // Verify anchor target exists
  83  |       const targetElement = page.locator(href);
  84  |       expect(await targetElement.count()).toBeGreaterThan(0);
  85  |     }
  86  |   });
  87  | 
  88  |   test('no broken internal links in mkdocs.yml navigation', async ({ page }) => {
  89  |     // Main pages that should exist
  90  |     const mainPages = [
  91  |       '/',
  92  |       '/phpRefresh/',
  93  |       '/PR/phpVar1/',
  94  |       '/Func/phpStr1/',
  95  |       '/DS/phpArray/',
  96  |       '/Classes/phpCls/',
  97  |     ];
  98  |     
  99  |     for (const mainPage of mainPages) {
  100 |       await page.goto(mainPage);
  101 |       expect(page.url()).toContain('/');
  102 |       expect(await page.title()).toBeTruthy();
  103 |     }
  104 |   });
  105 | });
  106 | 
```
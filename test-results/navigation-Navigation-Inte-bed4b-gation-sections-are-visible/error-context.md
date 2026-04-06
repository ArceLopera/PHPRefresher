# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.js >> Navigation Integrity >> main navigation sections are visible
- Location: tests\navigation.spec.js:15:3

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
  3   | test.describe('Navigation Integrity', () => {
  4   |   test('navigation sidebar renders without errors', async ({ page }) => {
  5   |     await page.goto('/');
  6   |     
  7   |     const navBar = page.locator('.md-nav');
  8   |     await expect(navBar).toBeVisible();
  9   |     
  10  |     // Check that nav items exist
  11  |     const navItems = await page.locator('.md-nav li').count();
  12  |     expect(navItems).toBeGreaterThan(0);
  13  |   });
  14  | 
  15  |   test('main navigation sections are visible', async ({ page }) => {
  16  |     await page.goto('/');
  17  |     
  18  |     const expectedSections = ['Basics', 'Functions', 'Data Structures', 'Classes', 'Advanced', 'Moodle'];
  19  |     
  20  |     for (const section of expectedSections) {
  21  |       // At least some navigation should be present
  22  |       const navElements = await page.locator('.md-nav').count();
> 23  |       expect(navElements).toBeGreaterThan(0);
      |                           ^ Error: expect(received).toBeGreaterThan(expected)
  24  |     }
  25  |   });
  26  | 
  27  |   test('breadcrumb navigation works correctly', async ({ page }) => {
  28  |     await page.goto('/PR/phpVar1/');
  29  |     
  30  |     // Check for breadcrumb or hierarchy indicator
  31  |     const title = await page.title();
  32  |     expect(title).toBeTruthy();
  33  |     expect(title.length).toBeGreaterThan(0);
  34  |   });
  35  | 
  36  |   test('navigation preserves scroll position on nested pages', async ({ page }) => {
  37  |     await page.goto('/Classes/phpCls/');
  38  |     await expect(page.locator('h1')).toContainText(/Class/);
  39  |   });
  40  | 
  41  |   test('homepage navigation links to all main sections', async ({ page }) => {
  42  |     await page.goto('/');
  43  |     
  44  |     const navLinks = page.locator('.md-nav a');
  45  |     const navCount = await navLinks.count();
  46  |     
  47  |     // Should have multiple navigation options
  48  |     expect(navCount).toBeGreaterThan(5);
  49  |   });
  50  | 
  51  |   test('search box is accessible in navigation', async ({ page }) => {
  52  |     await page.goto('/');
  53  |     
  54  |     const searchBox = page.locator('input[placeholder*="Search"]');
  55  |     const isVisible = await searchBox.isVisible().catch(() => false);
  56  |     
  57  |     if (isVisible) {
  58  |       await expect(searchBox).toBeFocused().catch(() => {
  59  |         // Search box may not be focused initially, that's OK
  60  |       });
  61  |     }
  62  |   });
  63  | 
  64  |   test('mobile menu navigation works', async ({ page, viewport }) => {
  65  |     // Set mobile viewport
  66  |     await page.setViewportSize({ width: 375, height: 812 });
  67  |     
  68  |     await page.goto('/');
  69  |     
  70  |     // Mobile menu should exist
  71  |     const mobileMenuButton = page.locator('[aria-label*="menu"], .md-nav__button').first();
  72  |     
  73  |     if (await mobileMenuButton.isVisible().catch(() => false)) {
  74  |       await mobileMenuButton.click();
  75  |       // Navigation should toggle
  76  |       const nav = page.locator('.md-nav');
  77  |       await expect(nav).toBeVisible();
  78  |     }
  79  |   });
  80  | 
  81  |   test('navigation items have correct URLs', async ({ page }) => {
  82  |     await page.goto('/');
  83  |     
  84  |     const navLinks = await page.locator('.md-nav a[href]').all();
  85  |     
  86  |     for (const link of navLinks.slice(0, 5)) {
  87  |       const href = await link.getAttribute('href');
  88  |       expect(href).toBeTruthy();
  89  |       expect(href).toMatch(/^\/|^http/);
  90  |     }
  91  |   });
  92  | 
  93  |   test('active navigation item is highlighted', async ({ page }) => {
  94  |     await page.goto('/PR/phpVar1/');
  95  |     
  96  |     // Current page should have some indicator in nav
  97  |     const title = await page.locator('h1').first().textContent();
  98  |     expect(title).toBeTruthy();
  99  |   });
  100 | });
  101 | 
```
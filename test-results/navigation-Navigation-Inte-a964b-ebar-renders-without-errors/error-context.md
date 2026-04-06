# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.js >> Navigation Integrity >> navigation sidebar renders without errors
- Location: tests\navigation.spec.js:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.md-nav')
Expected: visible
Error: strict mode violation: locator('.md-nav') resolved to 35 elements:
    1) <nav data-md-level="0" aria-label="Navigation" class="md-nav md-nav--primary md-nav--lifted">…</nav> aka getByRole('navigation', { name: 'Navigation' })
    2) <nav class="md-nav" data-md-level="1" aria-label="Getting Started">…</nav> aka getByText('Getting Started Introduction')
    3) <nav class="md-nav" data-md-level="1" aria-label="Best Practices">…</nav> aka getByText('Best Practices Overview')
    4) <nav class="md-nav" data-md-level="1" aria-label="Basics">…</nav> aka getByText('Basics General Variables and')
    5) <nav class="md-nav" data-md-level="2" aria-label="Variables and Assignments">…</nav> aka getByText('Variables and Assignments Variables Data Types and Casting Variable Scope')
    6) <nav class="md-nav" data-md-level="2" aria-label="Strings">…</nav> aka getByText('Strings Basics Functions')
    7) <nav class="md-nav" data-md-level="2" aria-label="Numbers">…</nav> aka getByText('Numbers Basics Functions')
    8) <nav class="md-nav" data-md-level="2" aria-label="Control Flow">…</nav> aka getByText('Control Flow Conditionals')
    9) <nav class="md-nav" data-md-level="1" aria-label="Functions">…</nav> aka getByText('Functions Built-in Built-in')
    10) <nav class="md-nav" data-md-level="2" aria-label="Built-in">…</nav> aka getByText('Built-in All Time n Date Time')
    ...

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.md-nav')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#welcome-to-php-refresher"
  - banner [ref=e3]:
    - navigation "Header" [ref=e4]:
      - link "PHP Refresher" [ref=e5] [cursor=pointer]:
        - /url: .
        - img "logo" [ref=e6]
      - generic [ref=e8]:
        - generic [ref=e10]: PHP Refresher
        - generic:
          - generic: Home
      - generic [ref=e11]:
        - radio "Switch to dark mode"
        - generic "Switch to dark mode" [ref=e12] [cursor=pointer]:
          - img [ref=e13]
        - radio "Switch to light mode"
      - dialog [ref=e15]:
        - search [ref=e16]:
          - generic [ref=e17]:
            - textbox "Search" [ref=e18]
            - generic:
              - img
            - navigation "Search":
              - button "Clear":
                - img
          - generic [ref=e19]:
            - generic [ref=e20]: Initializing search
            - list
      - link "ArceLopera/PHPRefresher" [ref=e22] [cursor=pointer]:
        - /url: https://github.com/ArceLopera/PHPRefresher
        - img [ref=e24]
        - generic [ref=e26]: ArceLopera/PHPRefresher
  - generic [ref=e27]:
    - navigation "Tabs" [ref=e28]:
      - list [ref=e30]:
        - listitem [ref=e31]:
          - link "Home" [ref=e32] [cursor=pointer]:
            - /url: .
        - listitem [ref=e33]:
          - link "Getting Started" [ref=e34] [cursor=pointer]:
            - /url: getting-started-index/
        - listitem [ref=e35]:
          - link "Best Practices" [ref=e36] [cursor=pointer]:
            - /url: best-practices-index/
        - listitem [ref=e37]:
          - link "Basics" [ref=e38] [cursor=pointer]:
            - /url: phpRefresh/
        - listitem [ref=e39]:
          - link "Functions" [ref=e40] [cursor=pointer]:
            - /url: Func/phpAll/
        - listitem [ref=e41]:
          - link "Data Structures" [ref=e42] [cursor=pointer]:
            - /url: DS/phpArray/
        - listitem [ref=e43]:
          - link "Classes" [ref=e44] [cursor=pointer]:
            - /url: Classes/phpCls/
        - listitem [ref=e45]:
          - link "Advanced" [ref=e46] [cursor=pointer]:
            - /url: Adv/phpInclude/
        - listitem [ref=e47]:
          - link "Moodle" [ref=e48] [cursor=pointer]:
            - /url: Moodle/phpMoodle/
    - main [ref=e49]:
      - generic [ref=e50]:
        - navigation "Navigation" [ref=e54]:
          - list [ref=e55]:
            - listitem [ref=e56]:
              - link "Home":
                - /url: .
        - generic [ref=e58]:
          - generic:
            - navigation "Table of contents"
        - article [ref=e60]:
          - heading "Welcome to PHP Refresher" [level=1] [ref=e61]
          - blockquote [ref=e62]:
            - paragraph [ref=e63]:
              - strong [ref=e64]: "Last updated:"
              - text: April 6, 2026
              - strong [ref=e65]: "Minimum PHP Version:"
              - text: PHP 7.4+
              - strong [ref=e66]: "Status:"
              - text: Stable
          - paragraph [ref=e67]: Everyone can forget about grammar and vocabulary.
          - paragraph [ref=e68]: What is most important is to know where to look.
          - paragraph [ref=e69]: The key to becoming a proficient PHP developer is to keep learning and practicing regularly. With a strong foundation in the basics, a commitment to ongoing learning, and a willingness to experiment with new tools and technologies, you can refresh your PHP skills and take your programming career to the next level.
          - paragraph
          - generic [ref=e70]:
            - paragraph
            - table [ref=e73]:
              - rowgroup [ref=e74]:
                - row "Basic Topics Advanced Topics" [ref=e75]:
                  - columnheader "Basic Topics" [ref=e76]
                  - columnheader "Advanced Topics" [ref=e77]
              - rowgroup [ref=e78]:
                - row "Basics File Management" [ref=e79]:
                  - cell "Basics" [ref=e80]:
                    - link "Basics" [ref=e81] [cursor=pointer]:
                      - /url: phpRefresh/
                  - cell "File Management" [ref=e82]:
                    - link "File Management" [ref=e83] [cursor=pointer]:
                      - /url: Adv/phpFile/
                - row "Functions MySql" [ref=e84]:
                  - cell "Functions" [ref=e85]:
                    - link "Functions" [ref=e86] [cursor=pointer]:
                      - /url: Func/phpAll/
                  - cell "MySql" [ref=e87]:
                    - link "MySql" [ref=e88] [cursor=pointer]:
                      - /url: Adv/phpMySql/
                - row "Data Structures XML" [ref=e89]:
                  - cell "Data Structures" [ref=e90]:
                    - link "Data Structures" [ref=e91] [cursor=pointer]:
                      - /url: DS/phpArray/
                  - cell "XML" [ref=e92]:
                    - link "XML" [ref=e93] [cursor=pointer]:
                      - /url: Adv/phpXML/
                - row "Classes Ajax" [ref=e94]:
                  - cell "Classes" [ref=e95]:
                    - link "Classes" [ref=e96] [cursor=pointer]:
                      - /url: Classes/phpCls/
                  - cell "Ajax" [ref=e97]:
                    - link "Ajax" [ref=e98] [cursor=pointer]:
                      - /url: Adv/phpAjax/
            - paragraph
          - paragraph
          - paragraph [ref=e99]:
            - text: This material is a work in progress, so your feedback is welcome. The best way to provide that feedback is
            - link "to click here and create an issue in this GitHub repository" [ref=e100] [cursor=pointer]:
              - /url: https://github.com/ArceLopera/PHPRefresher/issues
            - text: .
    - contentinfo [ref=e101]:
      - navigation "Footer" [ref=e102]:
        - 'link "Next: Introduction" [ref=e103] [cursor=pointer]':
          - /url: getting-started-index/
          - generic [ref=e105]:
            - generic [ref=e106]: Next
            - text: Introduction
          - img [ref=e108]
      - generic [ref=e111]:
        - generic [ref=e112]:
          - generic [ref=e113]: Copyright © 2024
          - text: Made with
          - link "Material for MkDocs" [ref=e114] [cursor=pointer]:
            - /url: https://squidfunk.github.io/mkdocs-material/
        - generic [ref=e115]:
          - link "linkedin.com" [ref=e116] [cursor=pointer]:
            - /url: https://linkedin.com/in/carlos-arcelopera
            - img [ref=e117]
          - link "github.com" [ref=e119] [cursor=pointer]:
            - /url: https://github.com/ArceLopera
            - img [ref=e120]
          - link "www.youtube.com" [ref=e122] [cursor=pointer]:
            - /url: https://www.youtube.com/
            - img [ref=e123]
          - link [ref=e125] [cursor=pointer]:
            - /url: mailto:arcelopera.carlos@gmail.com
            - img [ref=e126]
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
> 8   |     await expect(navBar).toBeVisible();
      |                          ^ Error: expect(locator).toBeVisible() failed
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
  23  |       expect(navElements).toBeGreaterThan(0);
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
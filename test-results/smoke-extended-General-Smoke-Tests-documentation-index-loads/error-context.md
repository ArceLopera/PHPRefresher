# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke-extended.spec.js >> General Smoke Tests >> documentation index loads
- Location: tests\smoke-extended.spec.js:16:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('main, article, .md-content')
Expected: visible
Error: strict mode violation: locator('main, article, .md-content') resolved to 3 elements:
    1) <main class="md-main" data-md-component="main">…</main> aka getByRole('main')
    2) <div class="md-content" data-md-component="content">…</div> aka locator('div').filter({ hasText: '- Not found' }).nth(2)
    3) <article class="md-content__inner md-typeset">…</article> aka getByRole('article')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('main, article, .md-content')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - navigation "Header" [ref=e3]:
      - link "PHP Refresher" [ref=e4] [cursor=pointer]:
        - /url: /PHPRefresher/.
        - img "logo" [ref=e5]
      - generic [ref=e9]: PHP Refresher
      - generic [ref=e10]:
        - radio "Switch to dark mode"
        - generic "Switch to dark mode" [ref=e11] [cursor=pointer]:
          - img [ref=e12]
        - radio "Switch to light mode"
      - dialog [ref=e14]:
        - search [ref=e15]:
          - generic [ref=e16]:
            - textbox "Search" [ref=e17]
            - generic:
              - img
            - navigation "Search":
              - button "Clear":
                - img
          - generic [ref=e18]:
            - generic [ref=e19]: Initializing search
            - list
      - link "ArceLopera/PHPRefresher" [ref=e21] [cursor=pointer]:
        - /url: https://github.com/ArceLopera/PHPRefresher
        - img [ref=e23]
        - generic [ref=e25]: ArceLopera/PHPRefresher
  - generic [ref=e26]:
    - navigation "Tabs" [ref=e27]:
      - list [ref=e29]:
        - listitem [ref=e30]:
          - link "Home" [ref=e31] [cursor=pointer]:
            - /url: /PHPRefresher/.
        - listitem [ref=e32]:
          - link "Getting Started" [ref=e33] [cursor=pointer]:
            - /url: /PHPRefresher/getting-started-index/
        - listitem [ref=e34]:
          - link "Best Practices" [ref=e35] [cursor=pointer]:
            - /url: /PHPRefresher/best-practices-index/
        - listitem [ref=e36]:
          - link "Basics" [ref=e37] [cursor=pointer]:
            - /url: /PHPRefresher/phpRefresh/
        - listitem [ref=e38]:
          - link "Functions" [ref=e39] [cursor=pointer]:
            - /url: /PHPRefresher/Func/phpAll/
        - listitem [ref=e40]:
          - link "Data Structures" [ref=e41] [cursor=pointer]:
            - /url: /PHPRefresher/DS/phpArray/
        - listitem [ref=e42]:
          - link "Classes" [ref=e43] [cursor=pointer]:
            - /url: /PHPRefresher/Classes/phpCls/
        - listitem [ref=e44]:
          - link "Advanced" [ref=e45] [cursor=pointer]:
            - /url: /PHPRefresher/Adv/phpInclude/
        - listitem [ref=e46]:
          - link "Moodle" [ref=e47] [cursor=pointer]:
            - /url: /PHPRefresher/Moodle/phpMoodle/
    - main [ref=e48]:
      - generic [ref=e49]:
        - generic [ref=e51]:
          - generic:
            - navigation "Navigation":
              - list
        - generic [ref=e53]:
          - generic:
            - navigation "Table of contents"
        - article [ref=e55]:
          - heading "404 - Not found" [level=1] [ref=e56]
    - contentinfo [ref=e57]:
      - generic [ref=e59]:
        - generic [ref=e60]:
          - generic [ref=e61]: Copyright © 2024
          - text: Made with
          - link "Material for MkDocs" [ref=e62] [cursor=pointer]:
            - /url: https://squidfunk.github.io/mkdocs-material/
        - generic [ref=e63]:
          - link "linkedin.com" [ref=e64] [cursor=pointer]:
            - /url: https://linkedin.com/in/carlos-arcelopera
            - img [ref=e65]
          - link "github.com" [ref=e67] [cursor=pointer]:
            - /url: https://github.com/ArceLopera
            - img [ref=e68]
          - link "www.youtube.com" [ref=e70] [cursor=pointer]:
            - /url: https://www.youtube.com/
            - img [ref=e71]
          - link [ref=e73] [cursor=pointer]:
            - /url: mailto:arcelopera.carlos@gmail.com
            - img [ref=e74]
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
> 20  |     await expect(mainContent).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
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
  69  |     await expect(metaViewport).toHaveAttribute('content', /width=device-width/);
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
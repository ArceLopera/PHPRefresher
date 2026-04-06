# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.js >> Responsive Design >> page renders on desktop (1280px width)
- Location: tests\responsive.spec.js:25:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('main, article, .md-content')
Expected: visible
Error: strict mode violation: locator('main, article, .md-content') resolved to 3 elements:
    1) <main class="md-main" data-md-component="main">…</main> aka getByRole('main')
    2) <div class="md-content" data-md-component="content">…</div> aka locator('div').filter({ hasText: 'Welcome to PHP Refresher Last' }).nth(2)
    3) <article class="md-content__inner md-typeset">…</article> aka getByText('Welcome to PHP Refresher Last')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('main, article, .md-content')

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
> 30  |     await expect(mainContent).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
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
  42  |     expect(isMobileMenuVisible || navVisible).toBe(true);
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
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: content.spec.js >> Content & Formatting >> code blocks render with syntax highlighting
- Location: tests\content.spec.js:4:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
  3   | test.describe('Content & Formatting', () => {
  4   |   test('code blocks render with syntax highlighting', async ({ page }) => {
  5   |     await page.goto('/PR/phpVar1/');
  6   |     
  7   |     const codeBlocks = await page.locator('code').count();
> 8   |     expect(codeBlocks).toBeGreaterThan(0);
      |                        ^ Error: expect(received).toBeGreaterThan(expected)
  9   |     
  10  |     const preElements = await page.locator('pre').count();
  11  |     expect(preElements).toBeGreaterThan(0);
  12  |   });
  13  | 
  14  |   test('tables display correctly', async ({ page }) => {
  15  |     await page.goto('/Classes/phpCls/');
  16  |     
  17  |     const tables = await page.locator('table').count();
  18  |     
  19  |     if (tables > 0) {
  20  |       // Tables should be visible and have content
  21  |       const firstTable = page.locator('table').first();
  22  |       await expect(firstTable).toBeVisible();
  23  |       
  24  |       const rows = await firstTable.locator('tr').count();
  25  |       expect(rows).toBeGreaterThan(0);
  26  |     }
  27  |   });
  28  | 
  29  |   test('images load correctly', async ({ page }) => {
  30  |     // Try a few pages that might have images
  31  |     const pages_to_check = [
  32  |       '/Moodle/phpMoodleTemplate/',
  33  |       '/',
  34  |     ];
  35  |     
  36  |     for (const pagePath of pages_to_check) {
  37  |       await page.goto(pagePath);
  38  |       
  39  |       const images = await page.locator('img').all();
  40  |       for (const img of images) {
  41  |         const alt = await img.getAttribute('alt');
  42  |         const src = await img.getAttribute('src');
  43  |         
  44  |         // Images should have alt text
  45  |         expect(alt).toBeTruthy();
  46  |         // Images should have src
  47  |         expect(src).toBeTruthy();
  48  |       }
  49  |     }
  50  |   });
  51  | 
  52  |   test('headings generate valid anchors', async ({ page }) => {
  53  |     await page.goto('/DS/phpArray/');
  54  |     
  55  |     const headings = await page.locator('h2, h3').all();
  56  |     
  57  |     for (const heading of headings.slice(0, 5)) {
  58  |       const headingText = await heading.textContent();
  59  |       expect(headingText).toBeTruthy();
  60  |       
  61  |       // Heading should be in DOM
  62  |       await expect(heading).toBeVisible();
  63  |     }
  64  |   });
  65  | 
  66  |   test('emphasis and strong text render correctly', async ({ page }) => {
  67  |     await page.goto('/PR/phpVar1/');
  68  |     
  69  |     const strongElements = await page.locator('strong').count();
  70  |     const emElements = await page.locator('em').count();
  71  |     
  72  |     // Should have some formatted text
  73  |     expect(strongElements + emElements).toBeGreaterThanOrEqual(0);
  74  |   });
  75  | 
  76  |   test('lists render correctly', async ({ page }) => {
  77  |     await page.goto('/Classes/phpCls/');
  78  |     
  79  |     const lists = await page.locator('ul, ol').count();
  80  |     expect(lists).toBeGreaterThanOrEqual(0);
  81  |     
  82  |     if (lists > 0) {
  83  |       const listItems = await page.locator('li').count();
  84  |       expect(listItems).toBeGreaterThan(0);
  85  |     }
  86  |   });
  87  | 
  88  |   test('code snippets have language class', async ({ page }) => {
  89  |     await page.goto('/PR/phpVar1/');
  90  |     
  91  |     const codeBlocks = await page.locator('pre code').all();
  92  |     
  93  |     for (const block of codeBlocks.slice(0, 3)) {
  94  |       const className = await block.getAttribute('class');
  95  |       // Should have language specification
  96  |       if (className) {
  97  |         expect(className).toBeTruthy();
  98  |       }
  99  |     }
  100 |   });
  101 | 
  102 |   test('blockquotes render correctly', async ({ page }) => {
  103 |     await page.goto('/');
  104 |     
  105 |     const blockquotes = await page.locator('blockquote').all();
  106 |     
  107 |     for (const quote of blockquotes) {
  108 |       await expect(quote).toBeVisible();
```
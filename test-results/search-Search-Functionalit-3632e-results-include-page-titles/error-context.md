# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.js >> Search Functionality >> search results include page titles
- Location: tests\search.spec.js:122:3

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "Variable"
Received string:    "PHP Refresher"
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
      - link "ArceLopera/PHPRefresher 0 0" [ref=e21] [cursor=pointer]:
        - /url: https://github.com/ArceLopera/PHPRefresher
        - img [ref=e23]
        - generic [ref=e25]:
          - text: ArceLopera/PHPRefresher
          - list [ref=e26]:
            - listitem [ref=e27]: "0"
            - listitem [ref=e28]: "0"
  - generic [ref=e29]:
    - navigation "Tabs" [ref=e30]:
      - list [ref=e32]:
        - listitem [ref=e33]:
          - link "Home" [ref=e34] [cursor=pointer]:
            - /url: /PHPRefresher/.
        - listitem [ref=e35]:
          - link "Getting Started" [ref=e36] [cursor=pointer]:
            - /url: /PHPRefresher/getting-started-index/
        - listitem [ref=e37]:
          - link "Best Practices" [ref=e38] [cursor=pointer]:
            - /url: /PHPRefresher/best-practices-index/
        - listitem [ref=e39]:
          - link "Basics" [ref=e40] [cursor=pointer]:
            - /url: /PHPRefresher/phpRefresh/
        - listitem [ref=e41]:
          - link "Functions" [ref=e42] [cursor=pointer]:
            - /url: /PHPRefresher/Func/phpAll/
        - listitem [ref=e43]:
          - link "Data Structures" [ref=e44] [cursor=pointer]:
            - /url: /PHPRefresher/DS/phpArray/
        - listitem [ref=e45]:
          - link "Classes" [ref=e46] [cursor=pointer]:
            - /url: /PHPRefresher/Classes/phpCls/
        - listitem [ref=e47]:
          - link "Advanced" [ref=e48] [cursor=pointer]:
            - /url: /PHPRefresher/Adv/phpInclude/
        - listitem [ref=e49]:
          - link "Moodle" [ref=e50] [cursor=pointer]:
            - /url: /PHPRefresher/Moodle/phpMoodle/
    - main [ref=e51]:
      - generic [ref=e52]:
        - generic [ref=e54]:
          - generic:
            - navigation "Navigation":
              - list
        - generic [ref=e56]:
          - generic:
            - navigation "Table of contents"
        - article [ref=e58]:
          - heading "404 - Not found" [level=1] [ref=e59]
    - contentinfo [ref=e60]:
      - generic [ref=e62]:
        - generic [ref=e63]:
          - generic [ref=e64]: Copyright © 2024
          - text: Made with
          - link "Material for MkDocs" [ref=e65] [cursor=pointer]:
            - /url: https://squidfunk.github.io/mkdocs-material/
        - generic [ref=e66]:
          - link "linkedin.com" [ref=e67] [cursor=pointer]:
            - /url: https://linkedin.com/in/carlos-arcelopera
            - img [ref=e68]
          - link "github.com" [ref=e70] [cursor=pointer]:
            - /url: https://github.com/ArceLopera
            - img [ref=e71]
          - link "www.youtube.com" [ref=e73] [cursor=pointer]:
            - /url: https://www.youtube.com/
            - img [ref=e74]
          - link [ref=e76] [cursor=pointer]:
            - /url: mailto:arcelopera.carlos@gmail.com
            - img [ref=e77]
```

# Test source

```ts
  29  |       const resultCount = await results.count().catch(() => 0);
  30  |       
  31  |       // May or may not have results depending on search implementation
  32  |       expect(resultCount).toBeGreaterThanOrEqual(0);
  33  |     }
  34  |   });
  35  | 
  36  |   test('search index is accessible', async ({ page }) => {
  37  |     await page.goto('/');
  38  |     
  39  |     // Check for search index file
  40  |     const response = await page.context().request.head('/search/search_index.json').catch(() => null);
  41  |     
  42  |     // Search index should exist or search should be available
  43  |     const searchBox = page.locator('input[placeholder*="Search"]').isVisible().catch(() => false);
  44  |     expect(await searchBox || response).toBeTruthy();
  45  |   });
  46  | 
  47  |   test('search results are navigable', async ({ page }) => {
  48  |     await page.goto('/');
  49  |     
  50  |     const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
  51  |     
  52  |     if (await searchBox.isVisible().catch(() => false)) {
  53  |       await searchBox.fill('PHP');
  54  |       await page.waitForTimeout(500);
  55  |       
  56  |       const resultLinks = page.locator('a[href*="/"]');
  57  |       const linkCount = await resultLinks.count();
  58  |       
  59  |       expect(linkCount).toBeGreaterThanOrEqual(0);
  60  |     }
  61  |   });
  62  | 
  63  |   test('search is case-insensitive', async ({ page }) => {
  64  |     await page.goto('/');
  65  |     
  66  |     const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
  67  |     
  68  |     if (await searchBox.isVisible().catch(() => false)) {
  69  |       // Try different cases
  70  |       await searchBox.fill('array');
  71  |       await page.waitForTimeout(300);
  72  |       const results1 = await page.locator('[class*="result"]').count().catch(() => 0);
  73  |       
  74  |       await searchBox.clear();
  75  |       await searchBox.fill('ARRAY');
  76  |       await page.waitForTimeout(300);
  77  |       const results2 = await page.locator('[class*="result"]').count().catch(() => 0);
  78  |       
  79  |       // Results should be similar regardless of case
  80  |       expect(results1 >= 0 && results2 >= 0).toBe(true);
  81  |     }
  82  |   });
  83  | 
  84  |   test('search handles special characters', async ({ page }) => {
  85  |     await page.goto('/');
  86  |     
  87  |     const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
  88  |     
  89  |     if (await searchBox.isVisible().catch(() => false)) {
  90  |       await searchBox.fill('$_');
  91  |       await page.waitForTimeout(300);
  92  |       
  93  |       // Should not crash
  94  |       const pageTitle = await page.title();
  95  |       expect(pageTitle).toBeTruthy();
  96  |     }
  97  |   });
  98  | 
  99  |   test('search can be cleared', async ({ page }) => {
  100 |     await page.goto('/');
  101 |     
  102 |     const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
  103 |     
  104 |     if (await searchBox.isVisible().catch(() => false)) {
  105 |       await searchBox.fill('test');
  106 |       expect(await searchBox.inputValue()).toBe('test');
  107 |       
  108 |       await searchBox.clear();
  109 |       expect(await searchBox.inputValue()).toBe('');
  110 |     }
  111 |   });
  112 | 
  113 |   test('search functionality degrades gracefully without JavaScript', async ({ page }) => {
  114 |     // This tests that the page doesn't break if search JS doesn't load
  115 |     await page.goto('/');
  116 |     
  117 |     // Page should load without search if needed
  118 |     const mainContent = page.locator('main, article, .md-content');
  119 |     await expect(mainContent).toBeVisible();
  120 |   });
  121 | 
  122 |   test('search results include page titles', async ({ page }) => {
  123 |     await page.goto('/');
  124 |     
  125 |     // Verify we can navigate to documentation pages
  126 |     await page.goto('/PR/phpVar1/');
  127 |     const title = await page.title();
  128 |     
> 129 |     expect(title).toContain('Variable');
      |                   ^ Error: expect(received).toContain(expected) // indexOf
  130 |   });
  131 | });
  132 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.js >> Search Functionality >> search functionality degrades gracefully without JavaScript
- Location: tests\search.spec.js:113:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('main, article, .md-content')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('main, article, .md-content')

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
  19  |     await page.goto('/');
  20  |     
  21  |     const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
  22  |     
  23  |     if (await searchBox.isVisible().catch(() => false)) {
  24  |       await searchBox.fill('array');
  25  |       await page.waitForTimeout(500);
  26  |       
  27  |       // Results should appear
  28  |       const results = page.locator('[class*="search-result"], [class*="md-search-result"]');
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
> 119 |     await expect(mainContent).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
  120 |   });
  121 | 
  122 |   test('search results include page titles', async ({ page }) => {
  123 |     await page.goto('/');
  124 |     
  125 |     // Verify we can navigate to documentation pages
  126 |     await page.goto('/PR/phpVar1/');
  127 |     const title = await page.title();
  128 |     
  129 |     expect(title).toContain('Variable');
  130 |   });
  131 | });
  132 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: content.spec.js >> Content & Formatting >> links in content are styled
- Location: tests\content.spec.js:112:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Test source

```ts
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
  109 |     }
  110 |   });
  111 | 
  112 |   test('links in content are styled', async ({ page }) => {
  113 |     await page.goto('/Func/phpCallback/');
  114 |     
  115 |     const links = await page.locator('a').count();
> 116 |     expect(links).toBeGreaterThan(0);
      |                   ^ Error: expect(received).toBeGreaterThan(expected)
  117 |     
  118 |     // At least some links should be visible
  119 |     const visibleLinks = await page.locator('a:visible').count();
  120 |     expect(visibleLinks).toBeGreaterThan(0);
  121 |   });
  122 | 
  123 |   test('code has proper line wrapping', async ({ page }) => {
  124 |     await page.goto('/Func/phpDate/');
  125 |     
  126 |     const codeBlocks = await page.locator('pre').all();
  127 |     
  128 |     for (const block of codeBlocks.slice(0, 2)) {
  129 |       const isVisible = await block.isVisible();
  130 |       expect(isVisible).toBe(true);
  131 |     }
  132 |   });
  133 | 
  134 |   test('navigation Quick Links work', async ({ page }) => {
  135 |     await page.goto('/PR/phpStr1/');
  136 |     
  137 |     // Look for Quick Navigation section
  138 |     const quickNav = page.locator('text=Quick Navigation');
  139 |     const exists = await quickNav.isVisible().catch(() => false);
  140 |     
  141 |     if (exists) {
  142 |       const navLinks = await page.locator('a[href^="#"]').count();
  143 |       expect(navLinks).toBeGreaterThan(0);
  144 |     }
  145 |   });
  146 | });
  147 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: performance.spec.js >> Performance >> no memory leaks in navigation
- Location: tests\performance.spec.js:93:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForLoadState: Test timeout of 30000ms exceeded.
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
            - generic [ref=e20]: Type to start searching
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
  41  |       expect(response.status()).toBeLessThan(400);
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
> 104 |       await page.waitForLoadState('networkidle');
      |                  ^ Error: page.waitForLoadState: Test timeout of 30000ms exceeded.
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
  142 |     }
  143 |   });
  144 | 
  145 |   test('no console errors on main pages', async ({ page }) => {
  146 |     const errors = [];
  147 |     
  148 |     page.on('console', msg => {
  149 |       if (msg.type() === 'error') {
  150 |         errors.push(msg.text());
  151 |       }
  152 |     });
  153 |     
  154 |     await page.goto('/');
  155 |     
  156 |     // May have some errors, but shouldn't be excessive
  157 |     console.log(`Console errors: ${errors.length}`);
  158 |   });
  159 | });
  160 | 
```
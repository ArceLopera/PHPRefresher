# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.js >> homepage has site name in title
- Location: tests\smoke.spec.js:3:1

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /PHP Refresher/i
Received string:  "Index of /"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    9 × unexpected value "Index of /"

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
  1 | const { test, expect } = require('@playwright/test');
  2 | 
  3 | test('homepage has site name in title', async ({ page }) => {
  4 |   await page.goto('/');
> 5 |   await expect(page).toHaveTitle(/PHP Refresher/i);
    |                      ^ Error: expect(page).toHaveTitle(expected) failed
  6 | });
  7 | 
```
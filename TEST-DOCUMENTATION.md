# PHPRefresher Test Suite Documentation

## Overview

The PHPRefresher test suite uses **Playwright** to provide comprehensive automated testing of the documentation site. Tests cover link validation, navigation integrity, content formatting, responsive design, search functionality, and performance metrics.

## Test Files

### 1. `smoke.spec.js` (Original)
Basic smoke test verifying the homepage loads correctly.

**Test count:** 1

### 2. `smoke-extended.spec.js` (New)
General smoke tests covering site accessibility and metadata.

**Tests:**
- Homepage loads successfully
- Main content sections exist
- All major documentation sections load (PR, Func, DS, Classes, Adv, Moodle)
- Page metadata is correct
- Site title consistency
- Dark mode availability
- Last updated metadata presence

**Test count:** 11

### 3. `links.spec.js` (New)
Link validation and URL structure tests.

**Tests:**
- All internal links are valid (no 404s)
- Navigation links work correctly
- Documentation links are structured correctly
- External links use HTTPS only
- Anchor links within pages work
- No broken internal links in navigation

**Test count:** 6

### 4. `navigation.spec.js` (New)
Navigation integrity and usability tests.

**Tests:**
- Navigation sidebar renders without errors
- Main navigation sections are visible
- Breadcrumb navigation works correctly
- Navigation preserves context on nested pages
- Homepage navigation links to all main sections
- Search box is accessible
- Mobile menu navigation works
- Navigation items have correct URLs
- Active navigation item is highlighted

**Test count:** 9

### 5. `content.spec.js` (New)
Content formatting and rendering tests.

**Tests:**
- Code blocks render with syntax highlighting
- Tables display correctly
- Images load correctly
- Headings generate valid anchors
- Emphasis and strong text render correctly
- Lists render correctly
- Code snippets have language class
- Blockquotes render correctly
- Links in content are styled
- Code has proper line wrapping
- Navigation Quick Links work

**Test count:** 11

### 6. `responsive.spec.js` (New)
Responsive design tests for different screen sizes.

**Tests:**
- Page renders on mobile (375px width)
- Page renders on tablet (768px width)
- Page renders on desktop (1280px width)
- Navigation adapts to mobile
- Code blocks are readable on mobile
- Tables are responsive
- Images scale appropriately
- Text is readable on mobile
- Buttons and links are touch-friendly
- No layout shift on page load

**Test count:** 10

### 7. `search.spec.js` (New)
Search functionality tests.

**Tests:**
- Search box is visible on all pages
- Search returns results for common terms
- Search index is accessible
- Search results are navigable
- Search is case-insensitive
- Search handles special characters
- Search can be cleared
- Search functionality degrades gracefully
- Search results include page titles

**Test count:** 9

### 8. `performance.spec.js` (New)
Performance and load time tests.

**Tests:**
- Homepage loads in reasonable time
- Documentation page loads quickly
- Build completes without errors
- Images are optimized
- CSS and JS are properly minified
- First contentful paint is quick
- No memory leaks in navigation
- Search performs efficiently
- Sidebar navigation doesn't cause layout thrashing
- No console errors on main pages

**Test count:** 10

## Total Test Count

**New tests:** 66  
**Original tests:** 1  
**Total:** 67+ automated tests

## Installation & Setup

### Prerequisites

```bash
# Ensure Node.js and npm are installed
node --version  # 14+ required
npm --version
```

### Install Dependencies

```bash
cd /path/to/PHPRefresher
npm install
npx playwright install --with-deps
```

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests with UI Mode (Recommended for Development)

```bash
npx playwright test --ui
```

This opens an interactive browser showing test execution, making it easy to debug failures.

### Run Specific Test File

```bash
npx playwright test tests/links.spec.js
npx playwright test tests/content.spec.js
```

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

Shows browser windows as tests run.

### Run Tests with Verbose Output

```bash
npx playwright test --reporter=list
```

### Update Snapshots (if any)

```bash
npx playwright test --update-snapshots
```

## Test Categories & What They Verify

### Link Validation Tests (6 tests)
✅ Ensures all internal and external links are valid  
✅ Checks HTTPS enforcement  
✅ Validates navigation structure  

**Run:**
```bash
npx playwright test tests/links.spec.js
```

### Navigation Tests (9 tests)
✅ Sidebar renders correctly  
✅ Navigation is accessible on all devices  
✅ Mobile menu works properly  

**Run:**
```bash
npx playwright test tests/navigation.spec.js
```

### Content Tests (11 tests)
✅ Code blocks display with syntax highlighting  
✅ Tables and images render correctly  
✅ Headings generate valid anchors  

**Run:**
```bash
npx playwright test tests/content.spec.js
```

### Responsive Tests (10 tests)
✅ Site works on mobile (375px), tablet (768px), desktop (1280px)  
✅ Touch targets are appropriately sized  
✅ No layout shifts or overflow  

**Run:**
```bash
npx playwright test tests/responsive.spec.js
```

### Search Tests (9 tests)
✅ Search box is accessible  
✅ Results return for common queries  
✅ Special characters are handled  

**Run:**
```bash
npx playwright test tests/search.spec.js
```

### Performance Tests (10 tests)
✅ Pages load within reasonable timeframes  
✅ First Contentful Paint is quick  
✅ No memory leaks during navigation  

**Run:**
```bash
npx playwright test tests/performance.spec.js
```

### Smoke Tests (12 tests)
✅ All major sections load  
✅ Metadata is correct  
✅ Basic functionality works  

**Run:**
```bash
npx playwright test tests/smoke*.spec.js
```

## CI/CD Integration

### GitHub Actions (Optional)

Add to `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npx playwright test
```

## Debugging Failed Tests

### View Test Execution

```bash
npx playwright test --debug
```

This opens the Playwright Inspector, allowing you to step through tests.

### Check Failed Test Report

```bash
npx playwright show-report
```

Opens an HTML report showing all test results with failure details.

### Run Single Test for Debugging

```bash
npx playwright test tests/content.spec.js -g "code blocks render"
```

### View Traces

Playwright automatically records traces for failed tests:

```bash
npx playwright show-trace tests/test-results/[test-name].zip
```

## Common Test Issues & Solutions

### Tests Timeout

**Problem:** Tests take longer than expected  
**Solution:** Increase timeout in `playwright.config.js`

```javascript
timeout: 30 * 1000,  // 30 seconds
```

### Search Tests Fail

**Problem:** Search functionality not found  
**Solution:** Verify search is enabled in mkdocs.yml

### Responsive Tests Fail

**Problem:** Layout breaks at certain widths  
**Solution:** Check Material theme CSS responsive breakpoints

### Performance Tests Fail

**Problem:** Pages load slowly  
**Solution:** Check server performance, optimize images, minify CSS/JS

## Best Practices

1. **Run tests locally before committing**
   ```bash
   npx playwright test
   ```

2. **Use UI mode for development**
   ```bash
   npx playwright test --ui
   ```

3. **Check test reports for details**
   ```bash
   npx playwright show-report
   ```

4. **Add new tests when fixing bugs**
   - Write test that reproduces the bug
   - Fix the bug
   - Commit both together

5. **Keep tests focused and independent**
   - Each test should be independent
   - Don't rely on test execution order
   - Use specific selectors

6. **Use meaningful test names**
   ```javascript
   test('search returns results when user enters valid query', async ({ page }) => {
     // Test code
   });
   ```

## Test Maintenance

### When to Update Tests

- ✅ When adding new features to the site
- ✅ When changing navigation structure
- ✅ When updating Material theme version
- ✅ When fixing bugs revealed by tests
- ❌ Don't update just to make failing tests pass

### Updating Selectors

If Material theme updates or HTML structure changes:

```javascript
// Old selector that breaks
const search = page.locator('.search-box');

// Check Material docs for new selector
const search = page.locator('input[placeholder*="Search"]');
```

## Performance Benchmarks

These are target ranges for healthy site performance:

| Metric | Target | Critical |
|--------|--------|----------|
| Homepage load | < 3s | < 5s |
| Page load | < 2s | < 3s |
| Search response | < 500ms | < 1s |
| First Contentful Paint | < 1s | < 2s |
| Mobile menu open | < 300ms | < 500ms |

## Adding New Tests

### Template

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Feature Category', () => {
  test('descriptive test name', async ({ page }) => {
    // Arrange
    await page.goto('/path');
    
    // Act
    await page.locator('selector').click();
    
    // Assert
    await expect(page.locator('result')).toBeVisible();
  });
});
```

### Example: Adding a New Test

```javascript
test('last-updated metadata shows current date', async ({ page }) => {
  await page.goto('/PR/phpVar1/');
  
  const lastUpdatedText = await page.locator('text=Last updated:').textContent();
  expect(lastUpdatedText).toMatch(/\d{4}-\d{2}-\d{2}/);
});
```

## Continuous Improvement

After running tests, analyze results to improve site quality:

1. **Review failed tests** - understand why they failed
2. **Check performance metrics** - identify slow pages
3. **Validate mobile experience** - ensure responsive design works
4. **Update tests** - add coverage for new features

## Support

For test-related questions:
- Check Playwright documentation: https://playwright.dev
- Review Material theme docs: https://squidfunk.github.io/mkdocs-material/
- Submit issues to the PHPRefresher repository

---

**Last Updated:** April 6, 2026  
**Test Suite Version:** 2.0  
**Total Tests:** 67+

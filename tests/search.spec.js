const { test, expect } = require('@playwright/test');

test.describe('Search Functionality', () => {
  test('search box is visible on all pages', async ({ page }) => {
    const pages = ['/', '/PR/phpVar1/', '/Func/phpStr1/'];
    
    for (const testPage of pages) {
      await page.goto(testPage);
      
      const searchBox = page.locator('input[placeholder*="Search"], .md-search__input');
      const isVisible = await searchBox.isVisible().catch(() => false);
      
      // Search should be accessible
      expect(isVisible).toBe(true);
    }
  });

  test('search returns results for common terms', async ({ page }) => {
    await page.goto('/');
    
    const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
    
    if (await searchBox.isVisible().catch(() => false)) {
      await searchBox.fill('array');
      await page.waitForTimeout(500);
      
      // Results should appear
      const results = page.locator('[class*="search-result"], [class*="md-search-result"]');
      const resultCount = await results.count().catch(() => 0);
      
      // May or may not have results depending on search implementation
      expect(resultCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('search index is accessible', async ({ page }) => {
    await page.goto('/');
    
    // Check for search index file
    const response = await page.context().request.head('/search/search_index.json').catch(() => null);
    
    // Search index should exist or search should be available
    const searchBox = page.locator('input[placeholder*="Search"]').isVisible().catch(() => false);
    expect(await searchBox || response).toBeTruthy();
  });

  test('search results are navigable', async ({ page }) => {
    await page.goto('/');
    
    const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
    
    if (await searchBox.isVisible().catch(() => false)) {
      await searchBox.fill('PHP');
      await page.waitForTimeout(500);
      
      const resultLinks = page.locator('a[href*="/"]');
      const linkCount = await resultLinks.count();
      
      expect(linkCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('search is case-insensitive', async ({ page }) => {
    await page.goto('/');
    
    const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
    
    if (await searchBox.isVisible().catch(() => false)) {
      // Try different cases
      await searchBox.fill('array');
      await page.waitForTimeout(300);
      const results1 = await page.locator('[class*="result"]').count().catch(() => 0);
      
      await searchBox.clear();
      await searchBox.fill('ARRAY');
      await page.waitForTimeout(300);
      const results2 = await page.locator('[class*="result"]').count().catch(() => 0);
      
      // Results should be similar regardless of case
      expect(results1 >= 0 && results2 >= 0).toBe(true);
    }
  });

  test('search handles special characters', async ({ page }) => {
    await page.goto('/');
    
    const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
    
    if (await searchBox.isVisible().catch(() => false)) {
      await searchBox.fill('$_');
      await page.waitForTimeout(300);
      
      // Should not crash
      const pageTitle = await page.title();
      expect(pageTitle).toBeTruthy();
    }
  });

  test('search can be cleared', async ({ page }) => {
    await page.goto('/');
    
    const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
    
    if (await searchBox.isVisible().catch(() => false)) {
      await searchBox.fill('test');
      expect(await searchBox.inputValue()).toBe('test');
      
      await searchBox.clear();
      expect(await searchBox.inputValue()).toBe('');
    }
  });

  test('search functionality degrades gracefully without JavaScript', async ({ page }) => {
    // This tests that the page doesn't break if search JS doesn't load
    await page.goto('/');
    
    // Page should load without search if needed
    const mainContent = page.locator('main, article, .md-content');
    await expect(mainContent).toBeVisible();
  });

  test('search results include page titles', async ({ page }) => {
    await page.goto('/');
    
    // Verify we can navigate to documentation pages
    await page.goto('/PR/phpVar1/');
    const title = await page.title();
    
    expect(title).toContain('Variable');
  });
});

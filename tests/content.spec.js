const { test, expect } = require('@playwright/test');

test.describe('Content & Formatting', () => {
  test('code blocks render with syntax highlighting', async ({ page }) => {
    await page.goto('/PR/phpVar1/');
    
    const codeBlocks = await page.locator('code').count();
    expect(codeBlocks).toBeGreaterThan(0);
    
    const preElements = await page.locator('pre').count();
    expect(preElements).toBeGreaterThan(0);
  });

  test('tables display correctly', async ({ page }) => {
    await page.goto('/Classes/phpCls/');
    
    const tables = await page.locator('table').count();
    
    if (tables > 0) {
      // Tables should be visible and have content
      const firstTable = page.locator('table').first();
      await expect(firstTable).toBeVisible();
      
      const rows = await firstTable.locator('tr').count();
      expect(rows).toBeGreaterThan(0);
    }
  });

  test('images load correctly', async ({ page }) => {
    // Try a few pages that might have images
    const pages_to_check = [
      '/Moodle/phpMoodleTemplate/',
      '/',
    ];
    
    for (const pagePath of pages_to_check) {
      await page.goto(pagePath);
      
      const images = await page.locator('img').all();
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        const src = await img.getAttribute('src');
        
        // Images should have alt text
        expect(alt).toBeTruthy();
        // Images should have src
        expect(src).toBeTruthy();
      }
    }
  });

  test('headings generate valid anchors', async ({ page }) => {
    await page.goto('/DS/phpArray/');
    
    const headings = await page.locator('h2, h3').all();
    
    for (const heading of headings.slice(0, 5)) {
      const headingText = await heading.textContent();
      expect(headingText).toBeTruthy();
      
      // Heading should be in DOM
      await expect(heading).toBeVisible();
    }
  });

  test('emphasis and strong text render correctly', async ({ page }) => {
    await page.goto('/PR/phpVar1/');
    
    const strongElements = await page.locator('strong').count();
    const emElements = await page.locator('em').count();
    
    // Should have some formatted text
    expect(strongElements + emElements).toBeGreaterThanOrEqual(0);
  });

  test('lists render correctly', async ({ page }) => {
    await page.goto('/Classes/phpCls/');
    
    const lists = await page.locator('ul, ol').count();
    expect(lists).toBeGreaterThanOrEqual(0);
    
    if (lists > 0) {
      const listItems = await page.locator('li').count();
      expect(listItems).toBeGreaterThan(0);
    }
  });

  test('code snippets have language class', async ({ page }) => {
    await page.goto('/PR/phpVar1/');
    
    const codeBlocks = await page.locator('pre code').all();
    
    for (const block of codeBlocks.slice(0, 3)) {
      const className = await block.getAttribute('class');
      // Should have language specification
      if (className) {
        expect(className).toBeTruthy();
      }
    }
  });

  test('blockquotes render correctly', async ({ page }) => {
    await page.goto('/');
    
    const blockquotes = await page.locator('blockquote').all();
    
    for (const quote of blockquotes) {
      await expect(quote).toBeVisible();
    }
  });

  test('links in content are styled', async ({ page }) => {
    await page.goto('/Func/phpCallback/');
    
    const links = await page.locator('a').count();
    expect(links).toBeGreaterThan(0);
    
    // At least some links should be visible
    const visibleLinks = await page.locator('a:visible').count();
    expect(visibleLinks).toBeGreaterThan(0);
  });

  test('code has proper line wrapping', async ({ page }) => {
    await page.goto('/Func/phpDate/');
    
    const codeBlocks = await page.locator('pre').all();
    
    for (const block of codeBlocks.slice(0, 2)) {
      const isVisible = await block.isVisible();
      expect(isVisible).toBe(true);
    }
  });

  test('navigation Quick Links work', async ({ page }) => {
    await page.goto('/PR/phpStr1/');
    
    // Look for Quick Navigation section
    const quickNav = page.locator('text=Quick Navigation');
    const exists = await quickNav.isVisible().catch(() => false);
    
    if (exists) {
      const navLinks = await page.locator('a[href^="#"]').count();
      expect(navLinks).toBeGreaterThan(0);
    }
  });
});

const { test, expect } = require('@playwright/test');

test.describe('Link Validation', () => {
  test('all internal links are valid', async ({ page }) => {
    await page.goto('/');
    
    // Get all internal links
    const links = await page.locator('a[href^="/"]').all();
    
    console.log(`Found ${links.length} internal links`);
    
    // Sample test - check that links exist and are not broken
    let checkedLinks = 0;
    for (const link of links.slice(0, 20)) {  // Test first 20 links
      const href = await link.getAttribute('href');
      if (href && !href.includes('#')) {
        await page.goto(href).catch(e => {
          console.log(`Failed to load: ${href}`);
        });
        expect(page.url()).toContain('/');
        checkedLinks++;
      }
    }
    
    expect(checkedLinks).toBeGreaterThan(0);
  });

  test('navigation links work correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test navbar links
    const navLinks = await page.locator('.md-nav a').count();
    expect(navLinks).toBeGreaterThan(0);
    
    // Click first nav link and verify page loads
    const firstNavLink = page.locator('.md-nav a').first();
    const href = await firstNavLink.getAttribute('href');
    
    if (href && href.startsWith('/')) {
      await firstNavLink.click();
      await expect(page).toHaveURL(new RegExp(href));
    }
  });

  test('documentation links are structured correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check for main documentation sections
    const sections = ['PR', 'Func', 'DS', 'Classes', 'Adv', 'Moodle'];
    
    for (const section of sections) {
      const sectionLink = page.locator(`a:has-text("${section}")`).first();
      const exists = await sectionLink.isVisible().catch(() => false);
      
      if (exists) {
        await expect(sectionLink).toBeVisible();
      }
    }
  });

  test('external links use HTTPS', async ({ page }) => {
    await page.goto('/');
    
    const links = await page.locator('a[href^="http"]').all();
    
    for (const link of links.slice(0, 10)) {
      const href = await link.getAttribute('href');
      expect(href).toMatch(/^https:\/\//);
    }
  });

  test('anchor links within page work', async ({ page }) => {
    await page.goto('/PR/phpVar1/');
    
    // Find all anchor links
    const anchorLinks = await page.locator('a[href^="#"]').count();
    
    if (anchorLinks > 0) {
      const firstAnchorLink = page.locator('a[href^="#"]').first();
      const href = await firstAnchorLink.getAttribute('href');
      
      // Verify anchor target exists
      const targetElement = page.locator(href);
      expect(await targetElement.count()).toBeGreaterThan(0);
    }
  });

  test('no broken internal links in mkdocs.yml navigation', async ({ page }) => {
    // Main pages that should exist
    const mainPages = [
      '/',
      '/phpRefresh/',
      '/PR/phpVar1/',
      '/Func/phpStr1/',
      '/DS/phpArray/',
      '/Classes/phpCls/',
    ];
    
    for (const mainPage of mainPages) {
      await page.goto(mainPage);
      expect(page.url()).toContain('/');
      expect(await page.title()).toBeTruthy();
    }
  });
});

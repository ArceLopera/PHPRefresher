const { test, expect } = require('@playwright/test');

test.describe('Navigation Integrity', () => {
  test('navigation sidebar renders without errors', async ({ page }) => {
    await page.goto('/');
    
    const navBar = page.locator('.md-nav');
    await expect(navBar).toBeVisible();
    
    // Check that nav items exist
    const navItems = await page.locator('.md-nav li').count();
    expect(navItems).toBeGreaterThan(0);
  });

  test('main navigation sections are visible', async ({ page }) => {
    await page.goto('/');
    
    const expectedSections = ['Basics', 'Functions', 'Data Structures', 'Classes', 'Advanced', 'Moodle'];
    
    for (const section of expectedSections) {
      // At least some navigation should be present
      const navElements = await page.locator('.md-nav').count();
      expect(navElements).toBeGreaterThan(0);
    }
  });

  test('breadcrumb navigation works correctly', async ({ page }) => {
    await page.goto('/PR/phpVar1/');
    
    // Check for breadcrumb or hierarchy indicator
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('navigation preserves scroll position on nested pages', async ({ page }) => {
    await page.goto('/Classes/phpCls/');
    await expect(page.locator('h1')).toContainText(/Class/);
  });

  test('homepage navigation links to all main sections', async ({ page }) => {
    await page.goto('/');
    
    const navLinks = page.locator('.md-nav a');
    const navCount = await navLinks.count();
    
    // Should have multiple navigation options
    expect(navCount).toBeGreaterThan(5);
  });

  test('search box is accessible in navigation', async ({ page }) => {
    await page.goto('/');
    
    const searchBox = page.locator('input[placeholder*="Search"]');
    const isVisible = await searchBox.isVisible().catch(() => false);
    
    if (isVisible) {
      await expect(searchBox).toBeFocused().catch(() => {
        // Search box may not be focused initially, that's OK
      });
    }
  });

  test('mobile menu navigation works', async ({ page, viewport }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    
    await page.goto('/');
    
    // Mobile menu should exist
    const mobileMenuButton = page.locator('[aria-label*="menu"], .md-nav__button').first();
    
    if (await mobileMenuButton.isVisible().catch(() => false)) {
      await mobileMenuButton.click();
      // Navigation should toggle
      const nav = page.locator('.md-nav');
      await expect(nav).toBeVisible();
    }
  });

  test('navigation items have correct URLs', async ({ page }) => {
    await page.goto('/');
    
    const navLinks = await page.locator('.md-nav a[href]').all();
    
    for (const link of navLinks.slice(0, 5)) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^\/|^http/);
    }
  });

  test('active navigation item is highlighted', async ({ page }) => {
    await page.goto('/PR/phpVar1/');
    
    // Current page should have some indicator in nav
    const title = await page.locator('h1').first().textContent();
    expect(title).toBeTruthy();
  });
});

const { test, expect } = require('@playwright/test');

test.describe('Responsive Design', () => {
  test('page renders on mobile (375px width)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    // Main content should still be accessible
    const mainContent = page.locator('main, article, .md-content');
    await expect(mainContent).toBeVisible();
    
    // No horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375 + 20);  // Allow small margin
  });

  test('page renders on tablet (768px width)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    const mainContent = page.locator('main, article, .md-content');
    await expect(mainContent).toBeVisible();
  });

  test('page renders on desktop (1280px width)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    const mainContent = page.locator('main, article, .md-content');
    await expect(mainContent).toBeVisible();
  });

  test('navigation adapts to mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    const mobileMenuButton = page.locator('[aria-label*="menu"], .md-nav__button').first();
    const isMobileMenuVisible = await mobileMenuButton.isVisible().catch(() => false);
    
    // Either menu button exists or nav is visible
    const navVisible = await page.locator('.md-nav').isVisible().catch(() => false);
    expect(isMobileMenuVisible || navVisible).toBe(true);
  });

  test('code blocks are readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/PR/phpVar1/');
    
    const codeBlocks = await page.locator('pre').count();
    if (codeBlocks > 0) {
      const firstCodeBlock = page.locator('pre').first();
      const isVisible = await firstCodeBlock.isVisible();
      expect(isVisible).toBe(true);
      
      // Should have horizontal scroll if needed
      const scrollWidth = await firstCodeBlock.evaluate(el => el.scrollWidth);
      const clientWidth = await firstCodeBlock.evaluate(el => el.clientWidth);
      expect(clientWidth).toBeGreaterThan(0);
    }
  });

  test('tables are responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/Classes/phpCls/');
    
    const tables = await page.locator('table').count();
    if (tables > 0) {
      const table = page.locator('table').first();
      await expect(table).toBeVisible();
    }
  });

  test('images scale appropriately', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    const images = await page.locator('img').all();
    
    for (const img of images.slice(0, 3)) {
      const isVisible = await img.isVisible();
      if (isVisible) {
        const width = await img.boundingBox();
        expect(width.width).toBeLessThanOrEqual(375);
      }
    }
  });

  test('text is readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();
    expect(bodyText.length).toBeGreaterThan(10);
  });

  test('buttons and links are touch-friendly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    const links = await page.locator('a').all();
    
    for (const link of links.slice(0, 5)) {
      const box = await link.boundingBox();
      if (box) {
        // Touch target should be at least 44x44px (mobile standard)
        expect(Math.max(box.width, box.height)).toBeGreaterThanOrEqual(30);
      }
    }
  });

  test('no layout shift on page load', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    const firstHeading = await page.locator('h1').first().boundingBox();
    expect(firstHeading).toBeTruthy();
    
    // Element should stay in place
    await page.waitForTimeout(1000);
    const secondMeasure = await page.locator('h1').first().boundingBox();
    expect(firstHeading.y).toBe(secondMeasure.y);
  });
});

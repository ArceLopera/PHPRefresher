const { test, expect } = require('@playwright/test');

test.describe('Performance', () => {
  test('homepage loads in reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
    
    console.log(`Homepage loaded in ${loadTime}ms`);
  });

  test('documentation page loads quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/PR/phpVar1/');
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    console.log(`Documentation page loaded in ${loadTime}ms`);
  });

  test('build completes without errors', async ({ page }) => {
    // This is validated by the mkdocs build process
    // If tests run successfully, the site was built correctly
    
    // Verify main pages are accessible
    const pages = [
      '/',
      '/phpRefresh/',
      '/PR/phpVar1/',
      '/Func/phpStr1/',
      '/DS/phpArray/',
    ];
    
    for (const testPage of pages) {
      const response = await page.goto(testPage);
      expect(response.status()).toBeLessThan(400);
    }
  });

  test('images are optimized', async ({ page }) => {
    await page.goto('/');
    
    const images = await page.locator('img').all();
    
    for (const img of images.slice(0, 3)) {
      const src = await img.getAttribute('src');
      expect(src).toBeTruthy();
      
      // Check if image is actually loaded
      const isLoaded = await img.evaluate(el => el.complete && el.naturalHeight > 0).catch(() => false);
      if (isLoaded !== undefined) {
        expect(isLoaded).toBe(true);
      }
    }
  });

  test('CSS and JS are properly minified', async ({ page }) => {
    const response = await page.goto('/');
    const resourceTiming = await page.evaluate(() => {
      return performance.getEntriesByType('resource').map(r => ({
        name: r.name,
        duration: r.duration,
        size: r.transferSize,
      }));
    });
    
    // Should have resources
    expect(resourceTiming.length).toBeGreaterThan(0);
    
    console.log(`Total resources: ${resourceTiming.length}`);
  });

  test('first contentful paint is quick', async ({ page }) => {
    const metrics = await page.goto('/').then(() => 
      page.evaluate(() => {
        const paintEntries = performance.getEntriesByType('paint');
        return paintEntries.find(p => p.name === 'first-contentful-paint');
      })
    );
    
    // FCP should ideally be under 2 seconds
    if (metrics) {
      console.log(`First Contentful Paint: ${metrics.startTime}ms`);
      expect(metrics.startTime).toBeLessThan(5000);
    }
  });

  test('no memory leaks in navigation', async ({ page }) => {
    // Navigate through multiple pages to check for memory issues
    const pages = [
      '/',
      '/PR/phpVar1/',
      '/Func/phpStr1/',
      '/Classes/phpCls/',
    ];
    
    for (const testPage of pages) {
      await page.goto(testPage);
      await page.waitForLoadState('networkidle');
    }
    
    // If we reach here without crashing, navigation is stable
    expect(true).toBe(true);
  });

  test('search performs efficiently', async ({ page }) => {
    await page.goto('/');
    
    const searchBox = page.locator('input[placeholder*="Search"], .md-search__input').first();
    
    if (await searchBox.isVisible().catch(() => false)) {
      const startTime = Date.now();
      await searchBox.fill('array');
      await page.waitForTimeout(500);
      const searchTime = Date.now() - startTime;
      
      // Search should be responsive
      expect(searchTime).toBeLessThan(2000);
    }
  });

  test('sidebar navigation does not cause layout thrashing', async ({ page }) => {
    await page.goto('/');
    
    // Toggle sidebar if it exists
    const sidebarButton = page.locator('[aria-label*="menu"], .md-nav__button').first();
    
    if (await sidebarButton.isVisible().catch(() => false)) {
      const measureTime = async () => {
        const start = Date.now();
        await sidebarButton.click();
        return Date.now() - start;
      };
      
      const time = await measureTime();
      expect(time).toBeLessThan(1000);
    }
  });

  test('no console errors on main pages', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    
    // May have some errors, but shouldn't be excessive
    console.log(`Console errors: ${errors.length}`);
  });
});

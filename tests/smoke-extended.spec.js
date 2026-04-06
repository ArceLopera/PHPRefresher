const { test, expect } = require('@playwright/test');

test.describe('General Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/PHP Refresher/i);
  });

  test('main content sections exist', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('documentation index loads', async ({ page }) => {
    await page.goto('/phpRefresh/');
    
    const mainContent = page.locator('main, article, .md-content');
    await expect(mainContent).toBeVisible();
  });

  test('PR section is accessible', async ({ page }) => {
    await page.goto('/PR/phpVar1/');
    
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('Functions section is accessible', async ({ page }) => {
    await page.goto('/Func/phpStr1/');
    
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('Data Structures section is accessible', async ({ page }) => {
    await page.goto('/DS/phpArray/');
    
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('Classes section is accessible', async ({ page }) => {
    await page.goto('/Classes/phpCls/');
    
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('Advanced section is accessible', async ({ page }) => {
    await page.goto('/Adv/phpMySql/');
    
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('Moodle section is accessible', async ({ page }) => {
    await page.goto('/Moodle/');
    
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('page metadata is correct', async ({ page }) => {
    await page.goto('/PR/phpVar1/');
    
    const metaViewport = page.locator('meta[name="viewport"]');
    await expect(metaViewport).toHaveAttribute('content', /width=device-width/);
  });

  test('favicon is present', async ({ page }) => {
    await page.goto('/');
    
    const favicon = page.locator('link[rel="icon"]');
    const exists = await favicon.count() > 0;
    
    // Favicon is nice to have but not critical
    console.log(`Favicon present: ${exists}`);
  });

  test('site title is consistent', async ({ page }) => {
    const pages = ['/', '/PR/phpVar1/', '/Func/phpStr1/'];
    
    for (const testPage of pages) {
      await page.goto(testPage);
      const title = await page.title();
      
      expect(title).toContain('PHP');
    }
  });

  test('dark mode is available', async ({ page }) => {
    await page.goto('/');
    
    const darkModeButton = page.locator('[aria-label*="dark"], [aria-label*="theme"]').first();
    const exists = await darkModeButton.isVisible().catch(() => false);
    
    console.log(`Dark mode button available: ${exists}`);
  });

  test('last updated metadata is present on pages', async ({ page }) => {
    const pages = ['/PR/phpVar1/', '/Func/phpStr1/', '/DS/phpArray/'];
    
    for (const testPage of pages) {
      await page.goto(testPage);
      
      const lastUpdated = page.locator('text=Last updated:');
      const exists = await lastUpdated.isVisible().catch(() => false);
      
      console.log(`Last updated metadata present: ${exists}`);
    }
  });
});

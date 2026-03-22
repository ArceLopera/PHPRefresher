const { test, expect } = require('@playwright/test');

test('homepage has site name in title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/PHP Refresher/i);
});

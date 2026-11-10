import { test, expect } from '@playwright/test';

test('test opencart.abstracta.us', async ({ page }) => {

  await page.goto('http://opencart.abstracta.us/');
  await page.getByRole('link', { name: 'Phones & PDAs' }).click();
  await page.getByRole('link', { name: 'iPhone' }).first().click();
  await expect(page.getByRole('heading', { name: 'iPhone' })).toBeVisible();
  await expect(page.locator('#content')).toContainText('$123.20');
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await expect(page.locator('#product-product')).toContainText('Success: You have added iPhone to your shopping cart!');
  await page.getByRole('link', { name: ' Shopping Cart' }).click();
  await page.getByRole('link', { name: 'Checkout', exact: true }).click();
});
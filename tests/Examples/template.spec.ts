import { test, expect } from '@playwright/test';

test('REQ-142: order cannot be submitted without payment',
    {
        annotation:[{
                type:"Requeriment",
                description:"REQ-142",
            },],
    },
        
    async ({ page }) => {

        await page.goto('https://playwright.dev/');

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Playwright/);

})
import { test, expect } from '@playwright/test';

test('test liverpool', async ({ page }) => {
  await page.goto('https://www.liverpool.com.mx');
  //await page.locator('//input[@id=\':R1bba9imjtpsq:-inpu\'"]').fill('iPhone');
  await page.getByRole('textbox', { name: 'Buscar por producto, categorí' }).fill('iPhone');
  //await page.getByPlaceholder('text').fill('iPhone');
  await page.keyboard.press('Enter')

  await expect(page).toHaveURL(/.*iphone/); // texto esperado en la URL
  await expect(page).toHaveTitle(/Iphone | Liverpool/) // Texto esperado en el titulo de la ventana del navegador

  const name = page.getByTestId('plp-page-heading-title-title')
  expect(name).toHaveText('Iphone');


  await page.getByTestId('plp-page-heading-title-title').dblclick()
  await expect(page.getByTestId('plp-page-heading-title-title')).toBeVisible()

  await page.getByRole('button', { name: 'Ordenar por:' }).click()

  const titles = await page.locator("//ul[contains(@role, \'listbox\')]//li").allInnerTexts()
  await page.locator("//li[contains(@role, \'option\')][1]").click()
    
  console.log('El numero de items', titles.length)

  for(let title  of titles){
    console.log('the title is: ',title)
  }

   await page.pause()

});
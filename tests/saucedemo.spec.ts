import { test, expect } from '@playwright/test';

test('test opencart.abstracta.us', async ({ page }) => {

    // *************** page LOGIN *************** //
    await page.goto('https://www.saucedemo.com/')

    await page.getByRole('textbox', {name:'Username'}).fill('standard_user')
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce')
    await page.getByRole('button',{name:'Login'}).click()

    // *************** PAGE ITEMS *************** //
        // COPY VALUES ITEMS

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()
    
    const randomIndex = Math.floor(Math.random() * itemsContainer.length)
    const randomItem = itemsContainer[randomIndex]

    //await page.pause()
    
    const expectedDesc = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

    console.log(`Name: ${expectedName} \nDescripción: ${expectedDesc} \nPrice: ${expectedPrice}`)

        // CLICK "ADD TO CART" // 
    await randomItem.getByRole('button',{name:'Add to cart'}).click()

    await page.locator('.shopping_cart_container').click()

    // *************** PAGE SUMARY ITEMS *************** //

    expect(page.getByRole('button',{name:'Checkout'})).toBeVisible()

    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualDesc = await page.locator('.inventory_item_desc').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(expectedName)
    expect(actualDesc).toEqual(expectedDesc)
    expect(actualPrice).toEqual(expectedPrice)

    await page.getByRole('button',{name:'Checkout'}).click()

    // *************** PAGE CHECK OUT INFORMATION *************** //

    await page.getByRole('textbox',{name:'First Name'}).fill('Jose Antonio')
    await page.getByRole('textbox',{name:'Last Name'}).fill('Perez')
    await page.getByRole('textbox',{name:'Zip/Postal Code'}).fill('12345')

    await page.getByRole('button',{name:'Continue'}).click()

    // *************** PAGE: Checkout: Overview *************** //

    const actualNameChk = await page.locator('.inventory_item_name').innerText()
    const actualDescChk = await page.locator('.inventory_item_desc').innerText()
    const actualPriceChk = await page.locator('.inventory_item_price').innerText()

    expect(actualNameChk).toEqual(expectedName)
    expect(actualDescChk).toEqual(expectedDesc)
    expect(actualPriceChk).toEqual(expectedPrice)

    const GetNumPedido = await page.locator('div[data-test=\'payment-info-value\']').innerText()
    const FormatNumPedido = GetNumPedido.replace('SauceCard ', '')
    expect(FormatNumPedido).toMatch(/^\#\d{5}$/) //#12345
    
    const gettax = await page.locator(".summary_tax_label").innerText()
    const gettotal = await page.locator("[data-test='total-label']").innerText()

    const precio = parseFloat(expectedPrice.replace('$', ''))
    const tax = parseFloat(gettax.replace('Tax: $', ''))
    const pageTotal = parseFloat(gettotal.replace('Total: $', ''))

    const totalCalculado = precio + tax;
    
    expect(totalCalculado).toEqual(pageTotal)

    await page.getByRole('button',{name:'Finish'}).click()

    // *************** PAGE: Checkout: Complete! *************** //

    await expect(page.getByAltText('Pony Express')).toBeVisible()
    await expect(page.getByRole('heading',{name:'Thank you for your order!'})).toBeVisible()

    await page.pause()

})
import { test, expect } from '@playwright/test';
import { loginPage } from './PageObject/loginPage';
import { ItemsPage } from './PageObject/ItemsPage';
import { SumaryItemsPage } from './PageObject/SumaryItemsPage';
import { checkOutInformationPage } from './PageObject/checkOutInformationPage'
import { checkoutOverviewPage } from './PageObject/checkoutOverviewPage'
import { checkOutCompletePage } from './PageObject/checkOutCompletePage'

test('test opencart.abstracta.us', async ({ page }) => {

    const login_Page = new loginPage(page)
    const Items_Page = new ItemsPage(page)
    const Sumary_Page = new SumaryItemsPage(page)
    const checkOut_InfoPage = new checkOutInformationPage(page)
    const checkout_OverviewPage = new checkoutOverviewPage(page)
    const checkOut_CompletePage = new checkOutCompletePage(page)
 
    // *************** page LOGIN *************** //
    await page.goto('https://www.saucedemo.com/')
     
    await login_Page.fillLogin('standard_user','secret_sauce')

    // assertion
    expect (await login_Page.checkSuccessfullogin()).toBeVisible()

    // *************** PAGE ITEMS *************** //
        // COPY VALUES ITEMS
   //console.log(`Name: ${expectedName} \nDescripción: ${expectedDesc} \nPrice: ${expectedPrice}`)

    const {expectedDesc, expectedName, expectedPrice} = await Items_Page.get_items()

    await Items_Page.btn_continue()

    // *************** PAGE SUMARY ITEMS *************** //

    expect (await Sumary_Page.Button_checkout()).toBeVisible()

    const {actual_Name, actual_Desc, actual_Price} = await Sumary_Page.get_items_sumary_items()

    expect(actual_Name).toEqual(expectedName)
    expect(actual_Desc).toEqual(expectedDesc)
    expect(actual_Price).toEqual(expectedPrice)

    await Sumary_Page.btn_continue()
    
    // *************** PAGE CHECK OUT INFORMATION *************** //

    await checkOut_InfoPage.fillDataInformation('Jose Antonio','Perez','12345')

    await checkOut_InfoPage.btn_continue()

    // *************** PAGE Checkout: Overview *************** //

    const {actualNameChk, actualDescChk, actualPriceChk} = await checkout_OverviewPage.get_item_overview()

    expect(actualNameChk).toEqual(expectedName)
    expect(actualDescChk).toEqual(expectedDesc)
    expect(actualPriceChk).toEqual(expectedPrice)

    const {FormatNumPedido, totalCalculado, pageTotal} = await checkout_OverviewPage.ValidaTicketDetail(expectedPrice)

    expect(FormatNumPedido).toMatch(/^\#\d{5}$/) //#12345
    
    expect(totalCalculado).toEqual(pageTotal)

    await checkout_OverviewPage.btnFinish()
    
    // *************** PAGE Checkout: Complete! *************** //

    const {txt_success_val, txt_thanks_val} = await checkOut_CompletePage.checkSuccessfullText()

    await expect(txt_success_val).toBeVisible()
    await expect(txt_thanks_val).toBeVisible()
    //await expect(page.getByRole('heading',{name:'Thank you for your order!'})).toBeVisible()

   // await page.pause()

})
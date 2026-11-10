import { Page, Locator } from "@playwright/test"

export class ItemsPage{
    
    private readonly itemsContainer: Locator
    private btn_Continue: Locator
 
    constructor(page: Page){
        this.itemsContainer = page.locator("#inventory_container .inventory_item")
        this.btn_Continue = page.locator('.shopping_cart_container')
    
    }
async get_items(){

    const items = await this.itemsContainer.all()
    const randomIndex = Math.floor(Math.random() * items.length)
    const randomItem = items[randomIndex];

    const expectedDesc = await randomItem
        .locator(".inventory_item_desc")
        .innerText();

    const expectedName = await randomItem
        .locator(".inventory_item_name")
        .innerText();

    const expectedPrice = await randomItem
        .locator(".inventory_item_price")
        .innerText();

    await randomItem.getByRole('button',{name:'Add to cart'}).click()

    return {
            expectedDesc,
            expectedName,
            expectedPrice,
        }
    }

    async btn_continue(){

        await this.btn_Continue.click();

    }

}
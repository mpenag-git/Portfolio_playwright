import { Locator, Page } from "@playwright/test"

export class SumaryItemsPage{
    

    private readonly btn_Checkout: Locator
    private readonly actualName : Locator
    private readonly actualDesc: Locator
    private readonly actualPrice: Locator
    private btn_Continue: Locator
 
    constructor(page: Page){
        
        this.btn_Checkout = page.getByRole('button',{name:'Checkout'})
        this.actualName = page.locator('.inventory_item_name')
        this.actualDesc = page.locator('.inventory_item_desc')
        this.actualPrice = page.locator('.inventory_item_price')
        this.btn_Continue = page.getByRole('button',{name:'Checkout'})
    
    }

    async Button_checkout(){

        const btn_Checkout_val = this.btn_Checkout
        return btn_Checkout_val
    }

    async get_items_sumary_items(){

        const actual_Name = await this.actualName.innerText()
        const actual_Desc = await this.actualDesc.innerText()
        const actual_Price = await this.actualPrice.innerText()
        
        return {
                actual_Name,
                actual_Desc,
                actual_Price
            }
    }

    async btn_continue(){

        await this.btn_Continue.click();

    }

}

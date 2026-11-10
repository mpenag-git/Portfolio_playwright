import { Locator, Page } from "@playwright/test"

export class checkOutCompletePage{

    private readonly txt_success: Locator
    private readonly txt_thanks: Locator

    constructor(page:Page){

        this.txt_success = page.getByAltText('Pony Express')
        this.txt_thanks = page.getByRole('heading',{name:'Thank you for your order!'})
    }


    async checkSuccessfullText(){
        
        const txt_success_val = this.txt_success
        const txt_thanks_val = this.txt_thanks

        return {
            txt_success_val,
            txt_thanks_val
        }
    }

    //await expect(page.getByAltText('Pony Express')).toBeVisible()
    //await expect(page.getByRole('heading',{name:'Thank you for your order!'})).toBeVisible()


}
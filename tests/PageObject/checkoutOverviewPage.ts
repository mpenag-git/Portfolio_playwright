import { Locator, Page } from "@playwright/test"

export class checkoutOverviewPage{
    
    private readonly actualName : Locator
    private readonly actualDesc: Locator
    private readonly actualPrice: Locator
    private readonly GetNumPedido: Locator
    private readonly gettax: Locator
    private readonly gettotal: Locator
    private readonly btn_finish: Locator
 
    constructor(page: Page){
        
        this.actualName = page.locator('.inventory_item_name')
        this.actualDesc = page.locator('.inventory_item_desc')
        this.actualPrice = page.locator('.inventory_item_price')
        this.GetNumPedido = page.locator('div[data-test=\'payment-info-value\']')
        this.gettax = page.locator(".summary_tax_label")
        this.gettotal = page.locator("[data-test='total-label']")
        this.btn_finish = page.getByRole('button',{name:'Finish'})
    
    }

    async get_item_overview(){

        const actualNameChk = await this.actualName.innerText()
        const actualDescChk = await this.actualDesc.innerText()
        const actualPriceChk = await this.actualPrice.innerText()
        
        return {
                actualNameChk,
                actualDescChk,
                actualPriceChk
            }
    }

    async ValidaTicketDetail(price:string){
        
        const GetNumTicket = await this.GetNumPedido.innerText()
        const FormatNumPedido = GetNumTicket.replace('SauceCard ', '')

        const get_tax = await this.gettax.innerText()
        const get_total = await this.gettotal.innerText()

        const precio = parseFloat(price.replace('$', ''))
        const tax = parseFloat(get_tax.replace('Tax: $', ''))
        const pageTotal = parseFloat(get_total.replace('Total: $', ''))

        const totalCalculado = precio + tax;


        return{

            FormatNumPedido,
            totalCalculado,
            pageTotal
        }


    }

    async btnFinish(){

        await this.btn_finish.click();

    }

}

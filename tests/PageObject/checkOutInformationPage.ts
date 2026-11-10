import { Locator, Page } from "@playwright/test"

export class checkOutInformationPage{

    private readonly firstName: Locator
    private readonly lastName: Locator
    private readonly zipCode: Locator
    private readonly btn_Continue: Locator

    constructor(page: Page){

        this.firstName = page.getByRole('textbox',{name:'First Name'})
        this.lastName = page.getByRole('textbox',{name:'Last Name'})
        this.zipCode = page.getByRole('textbox',{name:'Zip/Postal Code'})
        this.btn_Continue = page.getByRole('button',{name:'Continue'})
    }

    async fillDataInformation(name: string, Lname:string, Zcode:string){

        await this.firstName.fill(name)
        await this.lastName.fill(Lname)
        await this.zipCode.fill(Zcode)
    }

    async btn_continue(){

        await this.btn_Continue.click()

    }

}
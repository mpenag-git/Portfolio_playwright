import { Locator, Page } from "@playwright/test"

export class loginPage{

    private readonly usernameTextBox: Locator
    private readonly passwordTextBox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCartIcon: Locator


    constructor(page: Page){
        this.usernameTextBox = page.getByRole('textbox', {name:'Username'})
        this.passwordTextBox = page.getByRole('textbox',{name:'Password'})
        this.loginButton = page.getByRole('button',{name:'Login'})
        this.shoppingCartIcon = page.locator("//a[@class='shopping_cart_link']")
    }

    async fillUserName(Username:string){
        await this.usernameTextBox.fill(Username)
    }

   async fillPassword(password:string){
        await this.passwordTextBox.fill(password)
    }

   async ClickOnLogin(){
        await this.loginButton.click()
    }
    // mejora poner todas las acciones en una sola
    async fillLogin(usrname:string, pwd: string){
        await this.usernameTextBox.fill(usrname)
        await this.passwordTextBox.fill(pwd)
        await this.loginButton.click()
    }

    async checkSuccessfullogin(){
        
        const shoppingCartIcon_val = this.shoppingCartIcon
        return shoppingCartIcon_val
    }

}
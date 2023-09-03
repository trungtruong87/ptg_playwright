import { test, expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class AdminLoginPage extends AbstractPage {
  // Define selectors
  // readonly page: Page
  readonly EMAIL_ADDRESS_TEXTBOX: Locator
  readonly PASSWORD_TEXTBOX: Locator
  readonly LOGIN_BUTTON: Locator
  readonly ERROR_MESSAGE_1: Locator
  readonly ERROR_MESSAGE_2: Locator
  readonly FORGOT_PASSWORD_LINK: Locator
  readonly LOGIN_FORM: Locator
  


  // Init selectors using constructor
  constructor(page: Page) {
    // this.page = page
    super(page)
    this.EMAIL_ADDRESS_TEXTBOX = page.locator('//input[@id="signInName"]')
    this.PASSWORD_TEXTBOX = page.locator('#password')
    this.LOGIN_BUTTON = page.locator('#next')
    this.ERROR_MESSAGE_1 = page.locator('//div[@role="alert"]')
    this.ERROR_MESSAGE_2 = page.locator('//p[@role="alert"]')
    this.FORGOT_PASSWORD_LINK = page.locator('#forgotPassword')
    this.LOGIN_FORM = page.locator('#localAccountForm')
  }

  // Define possible actions on the UI elements on this page
  async enterEmailAddress(email: string){
    await test.step(`Enter ${email} in Email Address textbox.`, async () => {
      await this.EMAIL_ADDRESS_TEXTBOX.fill(email)
    });
  }

  async enterPassword(password: string){
    await test.step(`Enter ${password} in Password textbox.`, async () => {
      await this.PASSWORD_TEXTBOX.fill(password)
    });
  }

  async clickLogin(){
    await test.step('Click Login button.', async () => {
      await this.LOGIN_BUTTON.click()
    });
  }

  // Define login page methods

  
  async visit() {
    await test.step(`Navigate to ${process.env.EMPLOYER_PORTAL_URL!}.`, async () => {
      await this.page.goto(process.env.EMPLOYER_PORTAL_URL!, {waitUntil: 'domcontentloaded'})
    });  
  }

  // async login(email_address: string, password: string) {
  //   await this.EMAIL_ADDRESS_TEXTBOX.fill(email_address)
  //   await this.PASSWORD_TEXTBOX.fill(password)
  //   await this.LOGIN_BUTTON.click()
  // }

  async login(email_address: string, password: string) {
    await this.enterEmailAddress(email_address)
    await this.enterPassword(password)
    await this.clickLogin()
  }

  async assertErrorMessage1(message: string) {
    await test.step(`Verify warning message "${message}" is displayed.`, async () => {
      await expect(this.ERROR_MESSAGE_1).toContainText(message)
    });
  }

  async assertErrorMessage2(message: string) {
    await test.step(`Verify warning message "${message}" is displayed.`, async () => {
      await expect(this.ERROR_MESSAGE_2).toContainText(message)
    });
  }

  async assertLoginForm() {
    await test.step(`Verify Login form is displayed.`, async () => {
      await expect(this.LOGIN_FORM).toBeVisible()
    });
  }
}

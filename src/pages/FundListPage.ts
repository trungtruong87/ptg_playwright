import { test, expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'
import { time } from 'console'

export class FeedbackPage extends AbstractPage {
  readonly FUND_LIST_LABEL: Locator
  readonly NEW_FUND_LINK: Locator
  readonly NOTIFICATION_ICON: Locator
  readonly SETTING_ICON: Locator
  readonly FUND_NAME_TEXTBOX: Locator
  readonly FUND_KEY_TEXTBOX: Locator
  readonly NAME_USED_IN_URL_TEXTBOX: Locator
  readonly TIMEZONE_DROPDOWN: Locator
  readonly DEMO_APP_TOGGLE: Locator
  readonly SAVE_BUTTON: Locator
  readonly CANCEL_BUTTON: Locator

  constructor(page: Page) {
    super(page)
    this.FUND_LIST_LABEL = page.locator('//div[contains(text(),"Fund List")]')
    this.NEW_FUND_LINK = page.locator('//*[contains(text(),"New Fund")]')
    this.NOTIFICATION_ICON = page.locator('.mat-menu-trigger.btn-noti')
    this.SETTING_ICON = page.locator('(//mat-icon[@role="img"][normalize-space()="settings"])[1]')
    this.FUND_NAME_TEXTBOX = page.locator('#input-fund-name')
    this.FUND_KEY_TEXTBOX = page.locator('#input-fund-key')
    this.NAME_USED_IN_URL_TEXTBOX = page.locator('#input-short-name')
    this.TIMEZONE_DROPDOWN = page.locator('//mat-select[@id="mat-select-Time Zone"]')
    this.DEMO_APP_TOGGLE = page.locator('//*[contains(text(),"Demo App")]')
    this.SAVE_BUTTON = page.locator('//*[contains(text(),"Save")]')
    this.CANCEL_BUTTON = page.locator('//*[contains(text(),"Cancel")]')
  }

  // Define possible actions on the UI elements on this page

  async clickNewFund() {
    await test.step('Click New Fund link.', async () => {
      await this.NEW_FUND_LINK.click()
    })
  }

  async enterFundName(fund_name: string){
    await test.step(`Enter ${fund_name} in Fund Name textbox.`, async () => {
      await this.FUND_NAME_TEXTBOX.fill(fund_name)
    });
  }

  async enterFundKey(fund_key: string){
    await test.step(`Enter ${fund_key} in Fund Key textbox.`, async () => {
      await this.FUND_KEY_TEXTBOX.fill(fund_key)
    });
  }

  async enterNameUsedInUrl(short_name: string){
    await test.step(`Enter ${short_name} in Name Used in URL textbox.`, async () => {
      await this.NAME_USED_IN_URL_TEXTBOX.fill(short_name)
    });
  }

  async assertFundListLabel() {
    await test.step('Verify Fund List header is displayed.', async () => {
      await expect(this.FUND_LIST_LABEL).toBeVisible()
    })
  }

  async clickTimezone() {
    await test.step('Click Timezone dropdown.', async () => {
      await this.TIMEZONE_DROPDOWN.click()
    })
  }

  async clickTimezoneOption(option: string) {
    await test.step(`Click ${option}.`, async () => {
      await this.page.locator('//div[contains(text(),"' + option + '")]').click()
    })
  }

  async clickDemoApp() {
    await test.step('Click Demo App toggle.', async () => {
      await this.DEMO_APP_TOGGLE.click()
    })
  }

  async clickSave() {
    await test.step('Click Save button.', async () => {
      await this.SAVE_BUTTON.click()
    })
  }

  async clickCancel() {
    await test.step('Click Cancel button.', async () => {
      await this.CANCEL_BUTTON.click()
    })
  }

  async createNewFund(fund_name: string, fund_key: string, short_name: string, timezone: string, demo_app: boolean) {
    await this.clickNewFund()
    await this.enterFundName(fund_name)
    await this.enterFundKey(fund_key)
    await this.enterNameUsedInUrl(short_name)
    await this.clickTimezone()
    await this.clickTimezoneOption(timezone)
    if (demo_app) this.DEMO_APP_TOGGLE.click()
    await this.SAVE_BUTTON.click()
  }
}

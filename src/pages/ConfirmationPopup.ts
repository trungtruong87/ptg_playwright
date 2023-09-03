import { test, expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class ConfirmationPopup extends AbstractPage {
  //readonly page: Page
  readonly TITLE_LABEL: Locator
  readonly CONTENT_LABEL: Locator
  readonly YES_BUTTON: Locator
  readonly NO_BUTTON: Locator

  constructor(page: Page) {
    super(page)
    this.TITLE_LABEL = page.locator('//*[contains(@id, "mat-dialog")]//span[@class="title"]')
    this.CONTENT_LABEL = page.locator('//*[contains(@id, "mat-dialog")]//div[@class="content"]')
    this.YES_BUTTON = page.locator('//*[contains(@id, "mat-dialog")]//span[contains(.,"Yes")]')
    this.NO_BUTTON = page.locator('//*[contains(@id, "mat-dialog")]//span[contains(.,"No")]')
  }

  // Define possible actions on the UI elements on this page
  async clickYes() {
    await test.step('Click Yes button popup.', async () => {
      await this.YES_BUTTON.click()
    })
  }

  async clickNo() {
    await test.step('Click No button popup.', async () => {
      await this.NO_BUTTON.click()
    })
  }
}

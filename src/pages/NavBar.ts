import { test, expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class Navbar extends AbstractPage {
  //readonly page: Page
  readonly LOG_OUT_ICON: Locator
  readonly LOGGED_IN_AS_LABEL: Locator
  readonly USERNAME_LABEL: Locator
  readonly LOGO_IMAGE: Locator

  constructor(page: Page) {
    super(page)
    this.LOG_OUT_ICON = page.locator('//mat-icon[normalize-space()="logout"]')
    this.LOGGED_IN_AS_LABEL = page.locator('#lablel-logged')
    this.USERNAME_LABEL = page.locator('#username')
    this.LOGO_IMAGE = page.locator('img[alt="logo-PTG"]')
  }

  async assertPTGLogo() {
    await test.step('Verify PTG logo is displayed.', async () => {
      await expect(this.LOGO_IMAGE).toBeVisible()
    })
  }

  async clickLogout() {
    await test.step('Click Logout icon.', async () => {
      await this.LOG_OUT_ICON.click()
    })
  }
}

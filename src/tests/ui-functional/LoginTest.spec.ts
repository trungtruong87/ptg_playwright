import { test, expect } from '@playwright/test'
import { AdminLoginPage } from '../../pages/AdminLoginPage';
import { Navbar } from '../../pages/NavBar';
import { ConfirmationPopup } from '../../pages/ConfirmationPopup';

test.describe.parallel.only('Login / Logout Flow', () => {
  let loginPage: AdminLoginPage
  let navbar: Navbar
  let confirmationPopup: ConfirmationPopup
  let email: string
  let password: string

  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new AdminLoginPage(page)
    navbar = new Navbar(page)
    confirmationPopup = new ConfirmationPopup(page)
    email = String(process.env.EMPLOYER_PORTAL_EMAIL_ADDRESS)
    password = String(process.env.EMPLOYER_PORTAL_PASSWORD)
    await loginPage.visit()
  })

  test('Login with invalid email address and password', async ({ page }) => {
    await loginPage.login('invalid email', 'invalid password')
    await loginPage.assertErrorMessage1('Wrong email or password.')
  })

  test('Login with blank email address and password', async ({ page }) => {
    await loginPage.login('', '')
    await loginPage.assertErrorMessage1('Please enter your Email Address')
    await loginPage.assertErrorMessage2('Please enter your password')
  })

  test('Login with valid email address and password', async ({ page }) => {
    await loginPage.login(email, password)
    await navbar.assertPTGLogo()
  })

  test('Logout', async ({ page }) => {
    await loginPage.login(email, password)
    await navbar.clickLogout()
    await confirmationPopup.clickYes()
    await loginPage.assertLoginForm()
  })
})

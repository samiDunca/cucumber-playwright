import { Locator, expect } from "@playwright/test";

import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  private companyLogo: Locator = this.page.locator('.companyLogo');
  private todayLocator: Locator = this.page.getByText('TODAY')
  private emailInput: Locator = this.page.locator("input[placeholder='Email Address']");
  private passwordInput: Locator = this.page.locator("input[placeholder='Password']");
  private loginButton: Locator = this.page.locator("button[type='submit']");
  private arrowLogoutButton: Locator = this.page.locator('[data-icon="chevron-down"]');
  private logoutButton: Locator = this.page.locator('.logout-dropdown > li')
  private confirmLogoutButton: Locator = this.page.locator('.buttons-row > button:first-child')
  private paragraphUserName = this.page.locator("p:has-text('Dunca')");
  

  async enterEmail(email: any): Promise<void> {
    await this.emailInput.type(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.type(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async clickDownArrow() {
    await this.arrowLogoutButton.click()
  }

  async clickLogoutButton() {
    await this.logoutButton.click()
  }

  async confirmLogout() {
    await this.confirmLogoutButton.click()
  }

  async checkForSuccess() {
    await this.todayLocator.waitFor()
    await this.paragraphUserName.textContent();
  }

  async assertLogout() {
    await expect(this.companyLogo).toBeVisible({timeout: 8000})
  }
}

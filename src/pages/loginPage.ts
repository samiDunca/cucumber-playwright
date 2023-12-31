import { Locator } from "@playwright/test";

import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  private todayLocator: Locator = this.page.getByText('TODAY')
  private emailInput: Locator = this.page.locator("input[placeholder='Email Address']");
  private passwordInput: Locator = this.page.locator("input[placeholder='Password']");
  private loginButton: Locator = this.page.locator("button[type='submit']");
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

  async checkForSuccess() {
    await this.todayLocator.waitFor()
    await this.paragraphUserName.textContent();
  }

}

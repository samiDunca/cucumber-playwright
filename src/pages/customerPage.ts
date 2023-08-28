import { BasePage } from "./basePage";

export class CustomerPage extends BasePage {
  async clickCustomersPageButton(): Promise<void> {
    await this.page.getByRole("button", { name: "Customers" }).click();
  }

  async insertPersonalData(
    firstName: string,
    lastName: string,
    email: string,
    phone: number
  ): Promise<void> {
    await this.page.getByRole("textbox").first().fill(firstName);
    await this.page.getByRole("textbox").nth(1).fill(lastName);
    await this.page.getByRole("textbox").nth(2).fill(email);
    await this.page.getByRole("spinbutton").fill(phone.toString());
  }

  async clickCustomerByEmail(email: string): Promise<void> {
    await this.page.locator(`//td[text()='${email}']`).click();
  }

  async updateCustomerData(
    newFirstName: string,
    newLastName: string,
    newPhone: number
  ): Promise<void> {
    await this.page.getByRole("textbox").first().fill(newFirstName);
    await this.page.getByRole("textbox").nth(1).fill(newLastName);
    await this.page.getByRole("spinbutton").fill(newPhone.toString());
  }

  async verifyCustomerUpdate(
    firstName: string,
    lastName: string,
    phone: number
  ): Promise<void> {
    return
  }
}

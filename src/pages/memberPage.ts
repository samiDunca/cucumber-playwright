import { BasePage } from "./basePage";

export class MemberPage extends BasePage {
  async clickMembersPageButton(): Promise<void> {
    await this.page.waitForSelector(
      "(//div[@class='menu-items-container']//div)[3]"
    );
    await this.page.click("(//div[@class='menu-items-container']//div)[3]");
  }

  async clickAddMemberButton(): Promise<void> {
    await this.page.click(".add-member-icon > .svg-inline--fa");
  }

  async insertPersonalData(
    firstName: string,
    lastName: string,
    email: string,
    phone: number
  ): Promise<void> {
    await this.page.getByRole("textbox").first().fill(firstName);
    await this.page.getByText("Last Name").click();
    await this.page.getByRole("textbox").nth(1).fill(lastName);
    await this.page
      .locator('[id="headlessui-dialog-\\:r0\\:"]')
      .getByText("Email")
      .click();
    await this.page.locator('input[type="email"]').fill(email);
    await this.page
      .locator('[id="headlessui-dialog-\\:r0\\:"]')
      .getByText("Phone")
      .click();
    await this.page.getByRole("spinbutton").fill(phone.toString());
  }

  async clickSaveButton(): Promise<void> {
    await this.page.click('button:has-text("Save")');
  }

  async clickTotalMembers(): Promise<void> {
    await this.page.click("text=Total members");
  }

  async clickAnExistingMember(): Promise<void> {
    await this.page
      .locator("//table[@class='styled-table members-table']/tbody/tr[1]")
      .click();
  }

  async clickAccountTab(): Promise<void> {
    await this.page.click('//span[text()="Account"]');
  }

  async updateMemberData(
    firstName: string,
    lastName: string,
    phone: number
  ): Promise<void> {
    await this.page.getByRole("textbox").first().fill(firstName);
    await this.page.getByRole("textbox").nth(1).fill(lastName);
    await this.page.getByRole("spinbutton").fill(phone.toString());
  }

  async verifyMemberUpdate(
    firstName: string,
    lastName: string,
    phone: number
  ): Promise<void> {
    await this.page.click('//span[text()="Account"]');
    const actualFirstName = await this.page.inputValue(
      "(//input[@step='any'])[1]"
    );
    const actualLastName = await this.page.inputValue(
      "(//input[@step='any'])[2]"
    );
    const actualPhone = await this.page.inputValue("//input[@type='number']");
    if (
      actualFirstName !== firstName ||
      actualLastName !== lastName ||
      actualPhone !== phone.toString()
    ) {
      throw new Error("Member data not updated as expected.");
    }
  }
}

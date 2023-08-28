import { Given, When, Then } from "@cucumber/cucumber";

import { CustomerPage } from "../pages/customerPage";
import { ICustomWorld } from "../world/customWorld";
import { StringUtils, memberData } from "../utils/stringUtils";

let customerPage: CustomerPage;
let customerData: memberData;

Given(
  "the user clicks on the Customer page button",
  async function (this: ICustomWorld) {
    customerData = StringUtils.generateRandomUserData();
    customerPage = this.pagesObj.customerPage;
    await customerPage.clickCustomersPageButton();
  }
);

When("user insert personal data for customer", async function () {
  await customerPage.insertPersonalData(
    customerData.firstName,
    customerData.lastName,
    customerData.email,
    customerData.phoneNumber
  );
});

Then("the customer should be created", async function () {
  await this.page.getByText("Customers");
});

Then("the user clicks on the newly created customer", async function () {
  await customerPage.clickCustomerByEmail(customerData.email);
});

Then("the customer user is edited with the following data", async function () {
  await customerPage.updateCustomerData(
    customerData.newFirstName,
    customerData.newLastName,
    customerData.newPhoneNumber
  );
});

Then("the customer should be updated", async function () {
  await customerPage.verifyCustomerUpdate(
    customerData.firstName,
    customerData.lastName,
    customerData.phoneNumber
  );
});

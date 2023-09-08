import { Given, When, Then } from "@cucumber/cucumber";

import { LoginPage } from "../pages/loginPage";
import TestData from "../env/models/environment";
import { CustomWorld } from "../world/customWorld";

let loginPage: LoginPage;

let validUsers: TestData.UserCredentials[];
let invalidUsers: TestData.UserCredentials[];

Given("User navigates to the application", async function (this: CustomWorld) {
  const url = this.env.getUrl();
  validUsers = this.env.getValidUsers();
  invalidUsers = this.env.getInvalidUsers();
  loginPage = this.pagesObj.loginPage;
  await loginPage.page.goto(url);
});

Given("User enter the username", async function () {
  await loginPage.enterEmail(validUsers[0]?.email);
});

Given("User enter the password", async function () {
  await loginPage.enterPassword(validUsers[0]?.password);
});

When("User click on the signIn button", async function () {
  await loginPage.clickLoginButton();
});

Then("Login should be success", async function () {
  await loginPage.checkForSuccess();
});

Given("User logs in", async function () {
  await loginPage.enterEmail(validUsers[0]?.email);
  await loginPage.enterPassword(validUsers[0]?.password);
  await loginPage.clickLoginButton();
  await loginPage.checkForSuccess();
});

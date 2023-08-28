import { Given, When, Then } from "@cucumber/cucumber";

import { LoginPage } from "../pages/loginPage";
import TestData from "../env/models/environment";
import { CustomWorld } from "../world/customWorld";

let loginPage: LoginPage;

let validUsers: TestData.UserCredentials[];
let invalidUsers: TestData.UserCredentials[];

Given("User navigates to the application", async function (this: CustomWorld) {
  const url = this.env.getUrl();
  loginPage = this.pagesObj.loginPage;
  await loginPage.page.goto(url);

  validUsers = this.env.getValidUsers();
  invalidUsers = this.env.getInvalidUsers();
});

Given("User enter the username", async function () {
  await loginPage.enterEmail(validUsers[0]?.email);
});

Given("User enter the password", async function () {
  await loginPage.enterPassword(validUsers[0]?.password);
});

When("User click on the signIn button", async function () {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await loginPage.clickLoginButton();
});

Then("Login should be success", async function () {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const text = await loginPage.checkForSuccess();
});

Given("User logs in", async function () {
  await loginPage.enterEmail(validUsers[0]?.email);
  await loginPage.enterPassword(validUsers[0]?.password);
  await loginPage.clickLoginButton();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const text = await loginPage.checkForSuccess();
});

import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { LoginPage } from "../pages/loginPage";
import TestData from "../env/models/Environment";
import { CustomWorld, CustomWorldBeforeSetup } from "../world/custom-world";



setDefaultTimeout(3 * 5000);

let loginPage: LoginPage;

let validUsers: TestData.UserCredentials[];
let invalidUsers: TestData.UserCredentials[];

Given("User navigates to the application", async function (this: CustomWorldBeforeSetup) {
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

// logout wanna be functionality
Then("the User clicks on the arrow button", async () => {
  await loginPage.page.locator("(#text-body");
  await loginPage.page.locator(".avatar svg");
});
// comment
//   Then('the User clicks on the logout button', async function () {
//     // await loginPage.page.locator("li[text()='Logout']").click();
//     console.log("suntem inainte de logout");
//     await loginPage.page.getByText('Logout').click();
//     console.log("suntem dupa de logout");
//   });

//   Then('the User clicks on the logout confirm button', async function () {
//     // await loginPage.page.locator("(button[contains(@class,'standard-button ')])[2]").click();
//     //button[text()='Logout']
//     //div[@class='buttons-row']//button[1]
//     await loginPage.page.getByRole('button', { name: 'Logout' }).click();
//   });

//   Then('the user should be logged out', async function () {
//     const loginFormDisplayed = await loginPage.page.locator("div[@class='panel panel-default']").isVisible();
//     // div.panel-body
//     if (loginFormDisplayed) {
//       console.log("User is logged out.");
//     } else {
//       console.log("User is not logged out.");
//     }
//   });

// 2) Scenario: Login should not be success # src\test\feature\login.feature:13

When("Login should fail", async function () {
  loginPage.page.locator("div[class='error pageLevel']").getByText;
  console.log("user not logged in");
});

import { Given, When, Then } from "@cucumber/cucumber";

import { MemberPage } from "../pages/memberPage";
import { ICustomWorld } from "../world/customWorld";
import { StringUtils } from "../suport/utils/stringUtils";
import { memberData } from "../suport/types/member.type";

let memberPage: MemberPage;
let memberData: memberData;

Given(
  'the user clicks on the "Members" page button',
  async function (this: ICustomWorld) {
    memberData = StringUtils.generateRandomUserData();
    memberPage = this.pagesObj.memberPage;
    await memberPage.clickMembersPageButton();
  }
);

When("user clicks on + button", async function () {
  await memberPage.clickAddMemberButton();
});

Given("user insert personal data", async function () {
  await memberPage.insertPersonalData(
    memberData.firstName,
    memberData.lastName,
    memberData.email,
    memberData.phoneNumber
  );
});

Then("the member should be created", async function () {
  await memberPage.clickTotalMembers();
});

// Edit Member Steps

When("the user clicks on an existing Member", async function () {
  await memberPage.clickAnExistingMember();
});

When("the user click on the account tab", async function () {
  await memberPage.clickAccountTab();
});

When("the user is edited ", async function () {
  await memberPage.updateMemberData(
    memberData.newFirstName,
    memberData.newLastName,
    memberData.newPhoneNumber
  );
});

Then("the member should be updated", async function () {
  await memberPage.verifyMemberUpdate(
    memberData.newFirstName,
    memberData.newLastName,
    memberData.newPhoneNumber
  );
});

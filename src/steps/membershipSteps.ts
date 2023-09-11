import { Given, When, Then } from "@cucumber/cucumber";
import { faker } from "@faker-js/faker";

import { MembershipPage } from "../pages/membershipPage";
import { ICustomWorld } from "../world/customWorld";


let membershipPage: MembershipPage;
let membershipName: string;

  Given('that the user is on the Memberships page', async function (this: ICustomWorld) {
    membershipPage = this.pagesObj.membershipPage;
    membershipName = faker.internet.userName()
    console.log(membershipName)
    await membershipPage.userNavigatesToMembershipPage()
  });

  When('the user clicks on the plus button for new Membership Plan', async function () {
    await membershipPage.openNewMembershipPlanModal()
  });

  When('the user inserts name in Membership Name input', async function (this: ICustomWorld) {
    await membershipPage.insertMembershipName(membershipName)
  });

  When('the user selects a Booking Group from member dropdown', async function () {
    await membershipPage.selectBookingGroup('sdfglkjndsfg')
  });

  When('the user clicks the save button for Membership Plan modal', async function () {       
    await membershipPage.saveModalChanges()
  });

  Then('the membership should be created', async function () {
await membershipPage.assertMembershipCreation(membershipName)
  });


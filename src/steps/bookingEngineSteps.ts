import { Given, When, Then } from "@cucumber/cucumber";

import { BookingEnginePage } from "../pages/bookingEnginePage";
import { ICustomWorld } from "../world/customWorld";
import { StringUtils } from "../suport/utils/stringUtils";
import { IBookingGroupData } from "../suport/types/bookingEngine.type";

let bookingEnginePage: BookingEnginePage;
let bookingGroupUrl: string;
let newGroupData: IBookingGroupData;
let updateGroupData: IBookingGroupData;

Given("that the user is on the Booking Engine page", async function (this: ICustomWorld) {
    bookingGroupUrl = StringUtils.generateRandomBookingUrl();
    bookingEnginePage = this.pagesObj.bookingEnginePage;
    newGroupData = StringUtils.generateRandomBookingGroupData();
    updateGroupData = StringUtils.generateRandomBookingGroupData();
    await bookingEnginePage.userNavigatesToSettingsPage();
    await bookingEnginePage.userNavigateToBookingEnginePage();
  }
);

When("the user adds or changes the Url link", async function () {
  await bookingEnginePage.userInsertsBookingUrl(bookingGroupUrl);
});

When("the user saves the changes", async function () {
  await bookingEnginePage.clickOnSave();
});

Then("the Url should be saved successfully", async function () {
  await bookingEnginePage.checkIfTheSaveWasSuccessfull(bookingGroupUrl);
});

// Add booking group

When("the user clicks on the plus button in the top-right side above the table", async function () {
    await bookingEnginePage.openNewBookingGroupModal();
  }
);

When("the user inserts in Name input", async function () {
  await bookingEnginePage.enterBookingGroupName(newGroupData.groupName);
});

When("the user inserts number for Days in Advance input", async function () {
  await bookingEnginePage.enterDaysInAdvance(newGroupData.daysInAdvance.toString());
});

When("the user selects time", async function () {
  await bookingEnginePage.enterTime();
});

When("the user checks the following check-boxes:", async function (table) {
    let hashes = table.hashes()
    for (let index = 0; index < hashes.length; index++) {
      await bookingEnginePage.checkTheCheckbox(hashes[index].checkbox);
    }
});

When("the user inserts number for the following inputs:", async function (table) {
    let hashes = table.hashes()
    for (let index = 0; index < hashes.length; index++) {
      await bookingEnginePage.fillInputBookingRules(hashes[index].input, newGroupData);
    }
});

When("the user selects Booking Rate from Rates dropdown", async function () {
  await bookingEnginePage.selectPublicRate();
});

When("the user clicks the save button for modal", async function () {
  await bookingEnginePage.saveModal();
});

Then("the booking should be successfully created", async function () {});

// Edit booking group

When("the user clicks on the three dots button of the newly created booking group", async function () {
    await bookingEnginePage.clickThreeDotsButton(newGroupData.groupName);
});

When("the user press on edit button", async function () {
  await bookingEnginePage.clickEditButton()
});

When("the user modifies the New Name input", async function () {
  await bookingEnginePage.enterBookingGroupName(updateGroupData.groupName);
});

When("the user modifies the Days in Advance input", async function () {
  await bookingEnginePage.enterDaysInAdvance(
    updateGroupData.daysInAdvance.toString()
  );
});

When("the user selects another time", async function () {
  await bookingEnginePage.enterTime();
});

When("the user clicks the save button for modal after update", async function () {
    await bookingEnginePage.saveModal();
});

Then("the current booking group should be successfully updated", async function () {
    await bookingEnginePage.checkGroupIsUpdated(updateGroupData.groupName);
});

// Delete booking group

When("the user clicks on the three dots button of the current updated booking group", async function () {
    await bookingEnginePage.clickThreeDotsButton(updateGroupData.groupName);
});

When("the user click on delete button", async function () {
  await bookingEnginePage.clickDeleteButton()
});

When("the user clicks on Continue button on the confirmation modal", async function () {
    await bookingEnginePage.clickConfirmGroupDelete();
});

Then("the booking group should be successfully deleted", async function () {
  await bookingEnginePage.checkGroupIsDeleted(updateGroupData.groupName);
});

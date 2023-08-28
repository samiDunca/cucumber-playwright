import { Given, When, Then } from "@cucumber/cucumber";
import { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

import { BookingEnginePage } from "../pages/bookingEnginePage";
import { ICustomWorld } from "../world/customWorld";
import { StringUtils } from "../utils/stringUtils";

let bookingEnginePage: BookingEnginePage;
let url: string;

Given(
  "that the user is on the Booking Engine page",
  async function (this: ICustomWorld) {
    url = StringUtils.generateRandomBookingUrl();
    bookingEnginePage = this.pagesObj.bookingEnginePage;

    await bookingEnginePage.userNavigatesToSettingsPage();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await bookingEnginePage.userNavigateToBookingEnginePage();
  }
);

When("the user adds or changes the Url link", async function () {
  await new Promise((resolve) => setTimeout(resolve, 500));
  await bookingEnginePage.userInsertsBookingUrl(url);
});

When("the user saves the changes", async function () {
  await bookingEnginePage.clickOnSave();
});

Then("the Url should be saved successfully", async function () {
  await bookingEnginePage.checkIfTheSaveWasSuccessfull(url);
});

//////////////////////////////////////////
//
// Add, Edit, Delete a booking group

When(
  "the user clicks on {string} button in the top-right side above the table", async function (string) {
    await bookingEnginePage.openNewBookingGroupModal();
  }
);

When("the user inserts “name” input", async function () {
  await bookingEnginePage.enterBookingGroupName('Sara Fenesan')
});

When("the user inserts number for “days in advance”", async function () {
  await bookingEnginePage.enterDaysInAdvance('3');
});

When("the user selects time", async function () {
  await bookingEnginePage.enterTime('9:33 AM')
});

When(
  "the user check the following check-boxes: “Limit Concurrent Bookings”, “Limit Concurrent Hours”, “Limit Daily Play”, “Limit Monthly Play”",
  async function () {
    await bookingEnginePage.limitConcurentBookings()
    await bookingEnginePage.limitConcurentHours()
    await bookingEnginePage.limitDailyPlay()
    await bookingEnginePage.limitMonthlyPlay()
  }
);

When(
  "the user inserts number for “Max Concurrent Bookings”",
  async function () {
    await expect(bookingEnginePage.concurrentBookingsCheckbox).toBeChecked() 
    await bookingEnginePage.setConcurentBookings('3')
  }
);

When(
  "the user inserts number for “Max Concurrently Booked hours”",
  async function () {
    await expect(bookingEnginePage.concurrentHoursCheckbox).toBeChecked() 
    await bookingEnginePage.setConcurentBookedHours('3')
  }
);

When("the user inserts number for “Max Hours per Day”", async function () {
  await expect(bookingEnginePage.dailyPlayCheckbox).toBeChecked() 
  await bookingEnginePage.setMaxHoursPerDay('3')
});

When("the user inserts number for “Max Hours per Month”", async function () {
  await expect(bookingEnginePage.monthlyPlayCheckbox).toBeChecked() 
  await bookingEnginePage.setMaxHoursPerMonth('20')
});

When("the user selects booking rate from Rates dropdown", async function () {
  await bookingEnginePage.selectPublicRate();
});

When("the user clicks the {string} button", async function (string) {
  await bookingEnginePage.clickOnSave()
});

When('the user clicks the save button for modal', async function(string){
  await bookingEnginePage.saveModal()
})

Then("the booking should be successfully created", async function () {
  
});

When(
  "the user clicks on the {int} dots of the newly created booking group",
  async function (int) {
    return "pending";
  }
);

When("the user press on {string}", async function (string) {

});

When("the user modifies the “newName” input", async function () {});

When("the user modifies the “days in advance” input", async function () {});

When("the user selects another time", async function () {});

Then(
  "the current booking group should be successfully updated",
  async function () {}
);

When(
  "the user clicks on the {int} dots of the current updated booking group",
  async function (int) {
    return "pending";
  }
);

When("the user click on {string} button", async function (string) {});

When(
  "the user clicks on  {string} on the confirmation modal",
  async function (string) {}
);

Then("the booking group should be successfully deleted", async function () {});

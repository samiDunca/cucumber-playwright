import { Given, When, Then } from "@cucumber/cucumber";

import { ICustomWorld } from "../world/customWorld";
import { ReservationsPage } from "../pages/reservationsPage";
import { StringUtils } from "../suport/utils/stringUtils";
import { scheduleData } from "../suport/types/reservation.type";

let reservationsPage: ReservationsPage;
let minutes: number;
let newScheduleData: scheduleData;

// ----- edit No-Shoes Section
Given(
  "that the user is on the reservation page",
  async function (this: ICustomWorld) {
    reservationsPage = await this.pagesObj.reservationsPage;
    minutes = Math.floor(Math.random() * 60) + 1;
    newScheduleData = StringUtils.generateRandomReservationData();

    await reservationsPage.navigateToSettingsPage();
    await reservationsPage.navigateToReservationsPage();
  }
);

When("the user clicks on the {string} checkbox", async function (string) {
  await reservationsPage.checkTheCheckBox(string);
});

When("the user adjusts the time duration in the checkbox", async function () {
  await reservationsPage.insertsNoShowOffsetMinutes(minutes.toString());
});

When(
  "the user clicks the Save button for page modifications",
  async function () {
    await reservationsPage.savePageModifications();
  }
);

Then("the modified data should be saved", async function () {
  await reservationsPage.checkIfInputUpdated(newScheduleData.randomTwoDigitNumber.toString());
});

//////////////////////////////////////////
//
// Add, Edit, Delete a Schedule

Then(
  "the user clicks on the {string} button within the {string} section",
  async function (string, string2) {
    await reservationsPage.clickOnNewScheduleModal();
  }
);

When("the user fills in the required “Name” input", async function () {
  await reservationsPage.insertScheduleName(newScheduleData.scheduleName);
});

When('the user selects the calendar Start Date', async function () {
  await reservationsPage.selectStartDate();
});

When('the user selects the {string}', async function (string) {
  if(string === "Start Time"){
    await reservationsPage.insertStartTime(newScheduleData.hourFromFirstArray.toString());
  } else if(string === "End Time"){
    await reservationsPage.insertEndTime(newScheduleData.hourFromSecondArray.toString());
  }
});

When(
  "the user and selects an option from the repeat dropdown",
  async function (table) {
    const options = table.hashes();
    for (let index = 0; index < options.length; index++) {
      await reservationsPage.selectRepeatOption(options[index].repeatOption);
    }
  }
);

When("the user selects one or multiple week days", async function (table) {
  const day = table.hashes();
  for (let index = 0; index < day.length; index++) {
    console.log(day[index].dayInitialLetter)
    await reservationsPage.selectDaysToRepeat(day[index].dayInitialLetter);
  }
});

When('the user selects the calendar End Date', async function () {
  await reservationsPage.selectEndDate()
});

When("the user clicks the Save button for Schedule Modal", async function () {
  await reservationsPage.saveModalChanges();
});

Then("the schedule should be successfully created", async function () {});

Given("the user clicks on the newly created schedule", async function () {});

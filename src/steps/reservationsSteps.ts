import { Given, When, Then } from "@cucumber/cucumber";

import { ICustomWorld } from "../world/customWorld";
import { ReservationsPage } from "../pages/reservationsPage";
import { StringUtils } from "../suport/utils/stringUtils";
import { rateOverrideData, scheduleData } from "../suport/types/reservation.type";
import { expect } from "@playwright/test";

let reservationsPage: ReservationsPage;
let scheduleData1: scheduleData;
let scheduleData2: scheduleData;
let rateOverideObj: rateOverrideData

// ----- edit No-Shoes Section
Given(
  "that the user is on the reservation page",
  async function (this: ICustomWorld) {
    reservationsPage = this.pagesObj.reservationsPage;
    scheduleData1 = StringUtils.generateRandomReservationData();
    scheduleData2 = StringUtils.generateRandomReservationData()
    rateOverideObj = {overrideName: scheduleData1.overrideName, amount: scheduleData1.overrideAmount}

    await reservationsPage.navigateToSettingsPage();
    await reservationsPage.navigateToReservationsPage();
  }
);

When("the user clicks on the {string} checkbox", async function (string) {
  await reservationsPage.checkTheCheckBox(string);
});

When("the user adjusts the time duration in the checkbox", async function () {
  await reservationsPage.insertsNoShowOffsetMinutes(scheduleData1.randomTwoDigitNumber.toString());
});

Then("the modified data should be saved", async function () {
  await reservationsPage.checkIfInputUpdated(scheduleData2.randomTwoDigitNumber.toString());
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
  await reservationsPage.insertScheduleName(scheduleData1.scheduleName);
});

When('the user selects the calendar Start Date', async function () {
  await reservationsPage.selectStartDate();
});

When('the user selects the {string}', async function (string) {
  if(string === "Start Time"){
    await reservationsPage.insertStartTime(scheduleData1.hourFromFirstArray.toString());
  } else if(string === "End Time"){
    await reservationsPage.insertEndTime(scheduleData1.hourFromSecondArray.toString());
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
    await reservationsPage.selectDaysToRepeat(day[index].dayInitialLetter);
  }
});

When('the user selects the calendar End Date', async function () {
  await reservationsPage.selectEndDate()
});

When("the user clicks the Save button for Schedule Modal", async function () {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await reservationsPage.saveModalChanges();
  await reservationsPage.page.getByRole('button', {name: 'month'}).click()
  await reservationsPage.page.getByRole('button', {name: 'week'}).click()
});

Then("the schedule is successfully created", async function () {
  await reservationsPage.assertSuccessfullyCreatedSchedule()
});


// -------- Edit Schedule

Given("the user clicks on the newly created schedule", async function () {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const plusOneElements = await reservationsPage.page.locator("table [role='row'] td .fc-timegrid-more-link").all()
  if(plusOneElements){
    for(const element of plusOneElements){
      await element.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
      const popUpElements = await reservationsPage.page.locator('.fc-popover-body .event-title').all()
      if(popUpElements){
        for(const newEl of popUpElements){
          if(await newEl.textContent() === scheduleData1.scheduleName){
            newEl.click()
            return
          }
        }
      }
    } 
    await reservationsPage.clickNewlyCreatedSchedule(scheduleData1.scheduleName)
  }else {
    await reservationsPage.clickNewlyCreatedSchedule(scheduleData1.scheduleName)
  }
});


// -------- Add & Delete Rate Override Section

When('the user clicks on the {string} button in the {string} section', async function (string, string2) {
  await reservationsPage.openOverideSection()
});

Given('the user inserts the Override Name', async function () {
  await reservationsPage.insertOverrideName(rateOverideObj)
});

Given('the user inserts the Override Amount', async function () {
  await reservationsPage.insertOverrideAmount(rateOverideObj);
});
   
Given('the user selects “Rate” from dropdown', async function () {

  await reservationsPage.selectOverrideRate(rateOverideObj);
});
   
When('the user removes override by name', async function () {
    await reservationsPage.deleteRateOverrideByName(scheduleData1.overrideName)
});


// -------- bays and booking groups Section

Then('the user checks all checkboxes from bays section', async function () {
  await reservationsPage.checkBays()
});

Then('the user checks all checkboxes from the Booking Group Section', async function () {
  await reservationsPage.checkBookingGroups()
});

Then('the current schedule is successfully updated', async function () {
  await reservationsPage.assertSuccessfullyCreatedSchedule()
});


// -------- Delete Schedule 

Then('the user clicks on the newly edited schedule', async function () {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const plusOneElements = await reservationsPage.page.locator("table [role='row'] td .fc-timegrid-more-link").all()
  if(plusOneElements){
    for(const element of plusOneElements){
      await element.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
      const popUpElements = await reservationsPage.page.locator('.fc-popover-body .event-title').all()
      if(popUpElements){
        for(const newEl of popUpElements){
          if(await newEl.textContent() === scheduleData1.scheduleName){
            newEl.click()
            return
          }
        }
      }
    } 
    await reservationsPage.clickNewlyCreatedSchedule(scheduleData1.scheduleName)
  }else {
    await reservationsPage.clickNewlyCreatedSchedule(scheduleData1.scheduleName)
  }
});

Given('the user clicks on {string} button', async function (string) {
  await reservationsPage.page.getByRole('button', { name: `${string}` }).click()
});

Then('the schedule is successfully deleted', async function () {
  await reservationsPage.assertSuccessfullyCreatedSchedule()
});
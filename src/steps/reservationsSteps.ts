import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { ICustomWorld } from "../world/customWorld";
import { ReservationsPage } from "../pages/reservationsPage";
import { StringUtils } from "../suport/utils/stringUtils";
import { rateOverrideData, scheduleData } from "../suport/types/reservation.type";

let reservationsPage: ReservationsPage;
let scheduleData1: scheduleData;
let scheduleData2: scheduleData;
let rateOverideObj: rateOverrideData

// Edit No-Shows Section
Given("that the user is on the reservation page", async function (this: ICustomWorld) {
    reservationsPage = this.pagesObj.reservationsPage;
    scheduleData1 = StringUtils.generateRandomReservationData();
    scheduleData2 = StringUtils.generateRandomReservationData()
    rateOverideObj = {overrideName: scheduleData1.overrideName, amount: scheduleData1.overrideAmount}
    await reservationsPage.navigateToSettingsPage();
    await reservationsPage.navigateToReservationsPage();
});

When("the user clicks on the {string} checkbox", async function (string) {
  await reservationsPage.checkTheCheckBox(string);
});

When("the user adjusts the time duration in the checkbox", async function () {
  await reservationsPage.insertsNoShowOffsetMinutes(scheduleData1.randomTwoDigitNumber.toString());
});

Then("the modified data should be saved", async function () {
  await reservationsPage.checkIfInputUpdated();
});


// Add a Schedule

Then("the user clicks on the Plus button within the Schedule section", async function () {
    await reservationsPage.clickOnNewScheduleModal();
});

When("the user fills in the required Name input", async function () {
  await reservationsPage.insertScheduleName(scheduleData1.scheduleName);
});

When('the user selects the calendar {string}', async function (string) {
  await reservationsPage.selectDate(string);
});

When('the user selects the {string}', async function (string) {
  if(string === "Start Time"){
    await reservationsPage.insertStartTime(scheduleData1.hourFromFirstArray.toString());
  } else if(string === "End Time"){
    await reservationsPage.insertEndTime(scheduleData1.hourFromSecondArray.toString());
  }
});

When("the user and selects {string} from the repeat dropdown", async function (string) {
      await reservationsPage.selectRepeatOption(string);
});

When("the user selects one or multiple week days", async function (table) {
  let day = table.hashes();
  for (let index = 0; index < day.length; index++) {
    await reservationsPage.selectDaysToRepeat(day[index].dayInitialLetter);
  }
});

When("the user clicks the Save button for Schedule Modal", async function () {
  await reservationsPage.saveModalChanges();
});

Then("the schedule is successfully created", async function () {
  await reservationsPage.assertSuccessfullyCreatedSchedule()
});


// Edit schedule

Given("the user clicks on the newly created schedule", async function () {
  let plusOneElements = await reservationsPage.plusOneElements.all()
  await reservationsPage.page.waitForResponse(/\.*\/schedules\/occurrences\?.*/);
  await reservationsPage.titleTheadFirst.isVisible()
  if(plusOneElements.length > 0){
    for(let element of plusOneElements){
      await element.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
      let popUpElements = await reservationsPage.popUpElements.all()
      if(popUpElements){
        for(let newEl of popUpElements){
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


// Add Rate Override

When('the user clicks on the Plus button in the Rate Override section', async function () {
  await reservationsPage.openOverideSection()
});

Given('the user inserts the Override Name', async function () {
  await reservationsPage.insertOverrideName(rateOverideObj)
});

Given('the user inserts the Override Amount', async function () {
  await reservationsPage.insertOverrideAmount(rateOverideObj);
});
   
Given('the user selects Rate from dropdown', async function () {
  await reservationsPage.selectOverrideRate(rateOverideObj);
});


// Delete Rate Override
   
When('the user removes override by Name', async function () {
    await reservationsPage.deleteRateOverrideByName(scheduleData1.overrideName)
});


// Edit bays & booking groups

Then('the user checks all checkboxes from bays section', async function () {
  await reservationsPage.checkBays()
});

Then('the user checks all checkboxes from the Booking Group Section', async function () {
  await reservationsPage.checkBookingGroups()
});

Then('the current schedule is successfully updated', async function () {
  await reservationsPage.assertSuccessfullyCreatedSchedule()
});


// Delete Schedule 

Then('the user clicks on the newly edited schedule', async function () {
  await reservationsPage.titleTheadFirst.isVisible()
  let plusOneElements = await reservationsPage.plusOneElements.all()
  if(plusOneElements.length > 0 ){
    for(let element of plusOneElements){
      await element.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
      let popUpElements = await reservationsPage.popUpElements.all()
      if(popUpElements){
        for(let newEl of popUpElements){
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
  await reservationsPage.page.getByRole('button', { name: `${string}` }).isEnabled()
  await reservationsPage.page.getByRole('button', { name: `${string}` }).click()
});

Then('the schedule is successfully deleted', async function () {
  await reservationsPage.assertSuccessfullyCreatedSchedule()
});
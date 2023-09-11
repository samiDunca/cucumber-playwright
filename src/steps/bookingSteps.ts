import {  Given, When, Then } from "@cucumber/cucumber";
import {  expect } from "@playwright/test";

import { BookingPage } from "../pages/bookingPage";
import { ICustomWorld } from "../world/customWorld";
import { StringUtils } from "../suport/utils/stringUtils";
import { IBookingData } from "../suport/types/booking";
import { CalendarButtonNames } from "../suport/enums/booking.enum";
import { memberData } from "../suport/types/member.type";


let bookingPage: BookingPage;
let bookingData: IBookingData;
let accountData: memberData;
let newCustomer: memberData


// Add Reservation

When('the user click on calendar icon', async function () {
    bookingPage = this.pagesObj.bookingPage;
    bookingData = StringUtils.generateRandomBookingData() 
    accountData = StringUtils.generateRandomUserData()
    newCustomer = StringUtils.generateRandomUserData()
    await bookingPage.clickCalenderIcon()
  });

When('the user selects a date one month appart from current date', async function () {
    await bookingPage.selectDate()
  });

When("the user selects a random slot by given Time and Random Column", async function (this: ICustomWorld) {
    await bookingPage.selectBayByGivenTimeAndRandomColumn()
});

When('the user selects a random slot by given Column and Random Time', async function () {
    await bookingPage.selectBayByGivenColumnAndRandomTime('bah')
});
    
Then('the user is let to continue based on the slot availability', async function () {
    await expect(bookingPage.page.getByText('New Reservation')).toBeVisible()
});

When("the user selects reservation type", async function () {
    await bookingPage.selectReservationType(bookingData.tourTypeName)
});

When("the user selects a member from the dropdown", async function () {
    await bookingPage.selectMemberFromDropdown()
});

When('the user inserts in {string} customer input', async function (string) {
    await bookingPage.insertCustomerData(string, newCustomer)
});

When("the user selects the duration", async function () {
    await bookingPage.incrementDuration()
});

When('the user clicks on {string} Reservation button', async function (string) {
    await bookingPage.clickReservationButton(string)
  });

Then('a confirmation message is displayed', async function () {
    await expect(bookingPage.page.getByText('was created')).toBeVisible()
    await bookingPage.saveMemberName()
  });


  // Edit Reservation

 When('the user clicks on the newly created reservation', async function () {
    await bookingPage.clickOnTheNewlyCreatedBooking()
 });

When('the user clicks on edit icon', async function () {
    await bookingPage.clickOnEditIcon()
 });

 When('the user selects tomorrow date', async function () {
    await bookingPage.selectDate2()
 });

 When('the user changes {string} input', async function (string) {
    await bookingPage.changeReservationTime(string)
 });

Then('the modification is displayed in the table', async function () {
    await bookingPage.assertBookingEdits()
 })

Then('the {string} status modification is displayed in the table', async function (string) {
    await bookingPage.assertStatusModification(string)
  });

  
  // Delete Reservation

  When('the user clicks on the newly edited reservation', async function () {
    await bookingPage.clickOnNewlyEditedBooking()
  });

  When('the user click on the trash icon', async function () {
    await bookingPage.clickTrashIcon()
  });


Then('the reservation disappears from table', async function () {
    await bookingPage.assertionDeletedBooking()
});


// Assert calendar buttons 

When('user clicks on {string} button', async function (string) {
    bookingPage = this.pagesObj.bookingPage;
    await bookingPage.clickCalendarButton(string)
});

Then('the selected date {string} is displayed', async function (string) {
    await bookingPage.assertClickedCalendarButton(string)
});


// Edit reservation 

Then('the edited reservation is visible in the table', async function () {
    await bookingPage.clickCalendarButton(CalendarButtonNames.TOMORROW)
    await bookingPage.assertBookingEdits()
});


// Edit account 

When('the user clicks on {string} tab button', async function (string) {
    await bookingPage.clickReservationTabButtons(string)
  });

When('the user inserts in {string} input', async function (string) {
    await bookingPage.insertInUserData(string, accountData)
});

Then('the changes are displayed in the modal', async function () {
    await bookingPage.assertReservationAccount(accountData)
});


// Edit membership 

When('the user selects a membership plan from dropdown', async function () {
    await bookingPage.selectMembershipPlan();
  });

When('the user selects a start date in the future', async function () {
    await bookingPage.selectMembershipPlanStartDate()
});

Then('a message is displayed in the modal', async function () {
    await bookingPage.assertMembershipModification()
});

When('the user clicks on Tree Dots button', async function () {
    await bookingPage.clickOnEditMembershipButton()
});

When('the user clicks on {string}', async function (string) {
    await bookingPage.clickReservationTabButtons(string)
});

Then('the membership is deactivated', async function () {
    await bookingPage.assertionDeactivateMembership()
});

// Part of a bigger flow test

When('the user selects the newly created Membership Plan from dropdown', async function (this: ICustomWorld) {
    await bookingPage.selectMembershipPlanByName(this.pagesObj.membershipPage.newMembershipPlanName)
});

Given('that the user is on the First page', async function (this: ICustomWorld) {
    bookingPage = this.pagesObj.bookingPage
    await bookingPage.navigateToMainPage()
});

Then('the Current Membership is displayed in the Membership History table', async function () {
    await bookingPage.assertAssignedMembershipPlan()
  });
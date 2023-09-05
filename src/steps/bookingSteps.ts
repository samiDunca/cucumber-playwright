import { Given, When, Then } from "@cucumber/cucumber";
import { Locator, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

import { BookingPage } from "../pages/bookingPage";
import { ICustomWorld } from "../world/customWorld";
import { StringUtils } from "../suport/utils/stringUtils";
import { IBookingData } from "../suport/types/booking";


let bookingPage: BookingPage;
let bookingData: IBookingData;


//////////////////////////////////////////
//
// Add, Edit, Delete a Booking

When('the user click on calendar icon', async function () {
    bookingPage = this.pagesObj.bookingPage;
    bookingData = StringUtils.generateRandomBookingData() 

    await bookingPage.clickCalenderIcon()
  });

When('the user selects a date two month appart from current date', async function () {
    await bookingPage.selectData()
  });

When("the user selects a random slot by given Time and Random Column", async function (this: ICustomWorld) {
    await bookingPage.selectBayByGivenTimeAndRandomColumn()
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

When("the user selects the duration", async function () {
    await bookingPage.incrementDuration()
});

When('the user clicks on {string} Reservation button', async function (string) {
    await bookingPage.saveBookingButton(string)
  });

Then('a confirmation message is displayed', async function () {
    await expect(bookingPage.page.getByText('was created')).toBeVisible()
    
    await bookingPage.saveMemberName()
  });


  // --------Edit Booking

 When('the user clicks on the newly created reservation', async function () {
    await bookingPage.clickOnTheNewlyCreatedBooking()
 });

When('the user clicks on edit icon', async function () {
    await bookingPage.clickOnEditIcon()
 });

 When('the user changes End Time', async function () {
    await bookingPage.changeEndTime()
 });


Then('the modification is displayed in the table', async function () {
    await bookingPage.asertBookingEdits()
 })

 When('the user changes to {string} status', async function (string) {
    await bookingPage.changeBookingStatus(string)
  });

  Then('the {string} status modification is displayed in the table', async function (string) {
        await bookingPage.assertStatusModification(string)
  });


  // --------Delete

  When('the user clicks on the newly edited reservation', async function () {
    await bookingPage.clickOnNewlyEditedBooking()

  });

  When('the user click on the trash icon', async function () {
    await bookingPage.clickTrashIcon()
  });


Then('the reservation disappears from table', async function () {
    await bookingPage.assertionDeletedBooking()
});




import { Locator } from "@playwright/test";

import { BasePage } from "./basePage";

export class BookingEnginePage extends BasePage {
  private generalSettingsButton: Locator = this.page.locator(".menu-items-container > div:last-of-type");
  private bookingEngineButton: Locator = this.page.locator(".settings-menu button:nth-of-type(3)");
  private bookingUrlInput: Locator = this.page.locator('.input-container .flex .input');
  private saveButton: Locator = this.page.locator(".save-button button");
  private saveModalButton: Locator = this.page.locator(".title-container > .standard-button");

  private plusButton: Locator = this.page.locator('.plus-sign > .svg-inline--fa');
  private groupNameInput: Locator = this.page.locator('.name-container:last-child input');
  private daysInAdvanceInput: Locator = this.page.locator('.rates-modal-section-container:nth-child(2) .input-container:first-child input');

  private timePickerHours: Locator = this.page.locator('.rc-time-picker-panel-select:first-child ul li:nth-child(2)');
  private timePicker: Locator = this.page.locator('input[placeholder="Select Time"]');

  public concurrentBookingsCheckbox: Locator = this.page.locator('.rules-container:nth-child(1) .checkbox-input');
  public concurrentHoursCheckbox: Locator = this.page.locator('.rules-container:nth-child(2) .checkbox-input');
  public dailyPlayCheckbox: Locator = this.page.locator('.rules-container:nth-child(3) .checkbox-input');
  public monthlyPlayCheckbox: Locator = this.page.locator('.rules-container:nth-child(4) .checkbox-input');

  private concurrentBookingsInput: Locator = this.page.locator('.rules-container:nth-child(1) .input');
  private concurrentHoursInput: Locator = this.page.locator('.rules-container:nth-child(2) .input');
  private dailyPlayInput: Locator = this.page.locator('.rules-container:nth-child(3) .input');
  private monthlyPlayInput: Locator = this.page.locator('.rules-container:nth-child(4) .input');
  private publicRate: Locator = this.page.locator('.text-displayFive input');




  async userNavigatesToSettingsPage(): Promise<void> {
    await this.generalSettingsButton.click();
  }

  async userNavigateToBookingEnginePage(): Promise<void> {
    await this.bookingEngineButton.click();
  }

  async userInsertsBookingUrl(url: string): Promise<void> {
    await this.bookingUrlInput.click();
    await this.bookingUrlInput.fill(url);
  }

  async clickOnSave(): Promise<void> {
    await this.saveButton.click();
  }

  async saveModal() {
    await this.saveModalButton.click();
  }

  async checkIfTheSaveWasSuccessfull(url: string): Promise<void> {
    if ((await this.bookingUrlInput.inputValue()) === url) {
        console.log('salvat cu success')
      return
    } else {
      throw new Error("The url have not been saved");
    }
  }

  ///////////////////////////
  // Open modal booking group

  async openNewBookingGroupModal(): Promise<void> {
    await this.plusButton.click();
  }

  async enterBookingGroupName(name: string): Promise<void> {
    await this.groupNameInput.fill(name);
  }


   ////////////////
   // booking window

  async enterDaysInAdvance(daysInAdvance: string): Promise<void> {
    await this.daysInAdvanceInput.fill(daysInAdvance)
  }

  async enterTime(value: string): Promise<void> {
    // await this.timePicker.click()
    await this.timePicker.click();
    await this.timePickerHours.click();
  }


  /////////////////
  // booking rules

  async limitConcurentBookings() {
    await this.concurrentBookingsCheckbox.click();
  }

  async limitConcurentHours(){
    await this.concurrentHoursCheckbox.click();
  }

  async limitDailyPlay(){
    await this.dailyPlayCheckbox.click();
  }

  async limitMonthlyPlay(){
    await this.monthlyPlayCheckbox.click();
  }

  async setConcurentBookings(nrConcurrentBookings: string) {
    await this.concurrentBookingsInput.fill(nrConcurrentBookings)
  } 
  
  async setConcurentBookedHours(concurrentHours: string) {
    await this.concurrentHoursInput.fill(concurrentHours)
  }

  async setMaxHoursPerDay(hours: string) {
    await this.dailyPlayInput.fill(hours)
  }

  async setMaxHoursPerMonth(hours: string) {
    await this.monthlyPlayInput.fill(hours)
  }
  

  /////////////////
  // booking rates

  async selectPublicRate() {
    await this.publicRate.click()
    await this.publicRate.press('Enter')
  }
}

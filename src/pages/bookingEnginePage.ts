import { Locator, expect } from "@playwright/test";

import { BasePage } from "./basePage";
import { IBookingGroupData } from "../suport/types/bookingEngine.type";
import {BookingRulesCheckboxes, BookingRulesInputs} from "../suport/enums/bookingEngine.enum";

export class BookingEnginePage extends BasePage {

  private generalSettingsButton: Locator = this.page.locator(".menu-items-container > div:last-of-type");
  private bookingEngineButton: Locator = this.page.locator(".settings-menu button:nth-of-type(3)");
  private bookingUrlInput: Locator = this.page.locator(".input-container .flex .input");
  private saveButton: Locator = this.page.locator(".save-button button");
  private saveModalButton: Locator = this.page.locator(".title-container button");
  private editGroupButton: Locator = this.page.locator(".dropdown-menu li:nth-child(2)");
  private deleteGroupButton: Locator = this.page.locator(".dropdown-menu li:nth-child(3)");
  private confirmDeleteButton = this.page.locator(".buttons-row button:first-child");

  private plusButton: Locator = this.page.locator(".plus-sign > .svg-inline--fa");
  private groupNameInput: Locator = this.page.locator(".name-container:last-child input.input");
  private daysInAdvanceInput: Locator = this.page.locator(".rates-modal-section-container:nth-child(2) .input-container:first-child input");

  private hoursTimePicker: Locator = this.page.locator(".rc-time-picker-panel-select:first-child ul li:nth-child(2)");
  private timePicker: Locator = this.page.locator('input[placeholder="Select Time"]');

  public concurrentBookingsCheckbox: Locator = this.page.locator(".rules-container:nth-child(1) .checkbox-input");
  public concurrentHoursCheckbox: Locator = this.page.locator(".rules-container:nth-child(2) .checkbox-input");
  public dailyPlayCheckbox: Locator = this.page.locator(".rules-container:nth-child(3) .checkbox-input");
  public monthlyPlayCheckbox: Locator = this.page.locator(".rules-container:nth-child(4) .checkbox-input");

  private concurrentBookingsInput: Locator = this.page.locator(".rules-container:nth-child(1) .input");
  private concurrentHoursInput: Locator = this.page.locator(".rules-container:nth-child(2) .input");
  private dailyPlayInput: Locator = this.page.locator(".rules-container:nth-child(3) .input");
  private monthlyPlayInput: Locator = this.page.locator(".rules-container:nth-child(4) .input");
  private publicRate: Locator = this.page.locator(".text-displayFive input");
  private firstPublicRateOption: Locator = this.page.locator("div:nth-child(1) > .user-option:nth-child(1)");
  
  public bookingGroupName: string = '';


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
      return;
    } else {
      throw new Error("The url have not been saved");
    }
  }

  // Open modal booking group

  async openNewBookingGroupModal(): Promise<void> {
    await this.plusButton.click();
  }

  async enterBookingGroupName(name: string): Promise<void> {
    this.bookingGroupName = name;
    await this.groupNameInput.fill(name);
  }

  async enterDaysInAdvance(daysInAdvance: string): Promise<void> {
    await this.daysInAdvanceInput.fill(daysInAdvance);
  }

  async enterTime(): Promise<void> {
    await this.timePicker.click();
    await this.hoursTimePicker.click();
  }

  async checkTheCheckbox(checkboxName: BookingRulesCheckboxes) {
    switch (checkboxName) {
      case BookingRulesCheckboxes.LIMIT_CONCURRENT_BOOKINGS:
        await this.limitConcurentBookings();
        break;
      case BookingRulesCheckboxes.LIMIT_CONCURRENT_HOURS:
        await this.limitConcurentHours();
        break;
      case BookingRulesCheckboxes.LIMIT_DAILY_PLAY:
        await this.limitDailyPlay();
        break;
      case BookingRulesCheckboxes.LIMIT_MONTHLY_PLAY:
        await this.limitMonthlyPlay();
        break;
      default:
        break;
    }
  }

  async fillInputBookingRules(
    inputName: BookingRulesInputs,
    newGroupData: IBookingGroupData
  ) {
    let isChecked;
    switch (inputName) {
      case BookingRulesInputs.MAX_CONCURRENT_BOOKINGS:
        isChecked = await this.concurrentBookingsCheckbox.isChecked();
        isChecked
          ? await this.setConcurentBookings(
              newGroupData.maxConcurrentBookings.toString()
            )
          : null;
        break;
      case BookingRulesInputs.MAX_CONCURRENTLY_BOOKED_HOURS:
        isChecked = await this.concurrentHoursCheckbox.isChecked();
        isChecked
          ? await this.setConcurentBookedHours(
              newGroupData.maxConcurrentlyBookedHours.toString()
            )
          : null;
        break;
      case BookingRulesInputs.MAX_HOURS_PER_DAY:
        isChecked = await this.dailyPlayCheckbox.isChecked();
        isChecked
          ? await this.setMaxHoursPerDay(newGroupData.maxHoursPerDay.toString())
          : null;
        break;
      case BookingRulesInputs.MAX_HOURS_PER_MONTH:
        isChecked = await this.monthlyPlayCheckbox.isChecked();
        isChecked
          ? await this.setMaxHoursPerMonth(
              newGroupData.maxHoursPerMonth.toString()
            )
          : null;
        break;
      default:
        break;
    }
  }

  async limitConcurentBookings() {
    await this.concurrentBookingsCheckbox.click();
  }

  async limitConcurentHours() {
    await this.concurrentHoursCheckbox.click();
  }

  async limitDailyPlay() {
    await this.dailyPlayCheckbox.click();
  }

  async limitMonthlyPlay() {
    await this.monthlyPlayCheckbox.click();
  }

  async setConcurentBookings(nrConcurrentBookings: string) {
    await this.concurrentBookingsInput.fill(nrConcurrentBookings);
  }

  async setConcurentBookedHours(concurrentHours: string) {
    await this.concurrentHoursInput.fill(concurrentHours);
  }

  async setMaxHoursPerDay(hours: string) {
    await this.dailyPlayInput.fill(hours);
  }

  async setMaxHoursPerMonth(hours: string) {
    await this.monthlyPlayInput.fill(hours);
  }


  // Booking rates

  async selectPublicRate() {
    await this.publicRate.click();
    await this.firstPublicRateOption.click()
  }

  async checkGroupIsUpdated(updateGroupName: string) {
    let userEmail = await this.page.locator(`//table/tbody/tr/td[text()='${updateGroupName}']`).textContent();
    if (userEmail !== updateGroupName) {
      throw new Error("the update has not been done");
    }
  }

  async clickThreeDotsButton(updateGroupName: string) {
    await this.page
      .getByRole("row", { name: `${updateGroupName}` })
      .locator("svg")
      .click();
  }

  async clickEditButton() {
    await this.editGroupButton.click();
  }

  async clickDeleteButton() {
    await this.deleteGroupButton.click();
  }

  async clickConfirmGroupDelete() {
    await this.confirmDeleteButton.click();
  }

  async checkGroupIsDeleted(updateGroupName: string) {
    await expect(
      this.page.locator(`//table/tbody/tr/td[text()='${updateGroupName}']`)
    ).toHaveCount(0);
  }
}

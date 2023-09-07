import { Locator, expect } from "@playwright/test";

import { BasePage } from "./basePage";
import { ScheduleDate, ScheduleRepeatOptions, ScheduleStartEndCheckbox, ScheduleWeekDays } from "../suport/enums/reservations.enum";
import { rateOverrideData } from "../suport/types/reservation.type";
import { KeyboardCommands } from "../suport/enums/keyboardCommands.enum";

export class ReservationsPage extends BasePage {

  private isChecked: boolean = false;
  private generalSettingsButton: Locator = this.page.locator(".menu-items-container > div:last-of-type");
  private reservationsPageButton: Locator = this.page.locator(".settings-menu button:nth-child(2)");
  private saveModalChangesButton: Locator = this.page.locator(".title-container button[type='submit']");
  
  // No-Shows Section
  private noShowCheckBox: Locator = this.page.locator('input[name="markNoShows"]');
  private noShowInput: Locator = this.page.locator('form .section-container:nth-child(3) [type="number"]');
  private offsetMinutesInput: Locator = this.page.locator('div.section-container:nth-child(3) .input-container input')

  // Timeframe Section
  private newScheduleModal: Locator = this.page.locator('.plus-sign svg');
  private scheduleNameInput: Locator = this.page.locator('.name-container input');
  private startDateIcon: Locator = this.page.locator('.input-container > .svg-inline--fa').first();
  private currentDayButton: Locator = this.page.locator('.react-datepicker__month [aria-current="date"]');
  private endDateIcon: Locator = this.page.locator('div:nth-child(5) > .react-datepicker__input-container > .input-container > .svg-inline--fa');
  private nextMonthButton: Locator = this.page.locator('.react-datepicker svg.fa-arrow-right');
  private endDate: Locator = this.page.locator('.react-datepicker__week:nth-child(2) .react-datepicker__day:nth-child(4)');

  private startCourseCheckbox: Locator =  this.page.locator('div').filter({ hasText: /^Start when course opensEnd when course closes$/ }).getByRole('checkbox').first()
  private endCourseCheckbox: Locator =  this.page.locator('div').filter({ hasText: /^Start when course opensEnd when course closes$/ }).getByRole('checkbox').nth(1)
  public startCourseCheckboxIsChecked: boolean = true;
  public endCourseCheckboxIsChecked: boolean = true;

  private startTimeArrowButton: Locator = this.page.locator('.dropdown-arrow > svg').first()
  private endTimeArrowButton: Locator = this.page.locator('div').filter({ hasText: /^End TimeSelect\.\.\.$/ }).locator('svg')
  private repeatArrowButton: Locator = this.page.locator('.schedules-modal-section-container:nth-child(2) .items-center:nth-child(4) .dropdown-arrow')
  private repeatOptionsInput: Locator = this.page.locator('.schedules-modal-section-container:nth-child(2) > .flex >.flex:nth-child(4) input')
  public repeatInputValue: string = ''

  // Rate Override Section
  private newOverrideButton: Locator = this.page.locator('.schedules-modal-section-container > .divider-container > .group > .plus-sign > .svg-inline--fa')
  private overrideNameInput: Locator = this.page.locator('.name-rate-group input.input')
  private overideSelectInput: Locator = this.page.locator('.name-rate-group [aria-autocomplete="list"]')
  private overrideAmountInput: Locator = this.page.locator(".rate-override-container input[type='number']")
  private rateOverrideContainerList: Locator = this.page.locator(".schedules-modal-section-container .gap-7 ")

  // Bays and Booking Groups Section
  private allBays: Locator = this.page.locator('form .schedules-modal-container > div:nth-child(4) table tbody tr')
  private allBookingGroups: Locator = this.page.locator('form .schedules-modal-container > div:nth-child(5) table tbody tr')

  // All Schedules Calendar Section
  private allScheduleTitles: Locator = this.page.locator('table [role="row"] td .event-title');
  public titleTheadFirst: Locator = this.page.locator('table thead:first-child')
  public plusOneElements: Locator = this.page.locator("table [role='row'] td .fc-timegrid-more-link")
  public popUpElements: Locator = this.page.locator('.fc-popover-body .event-title')

  async navigateToSettingsPage(): Promise<void> {
    await this.generalSettingsButton.click();
  }

  async navigateToReservationsPage(): Promise<void> {
    await this.reservationsPageButton.click();
  }

  async checkTheCheckBox(checkboxName: ScheduleStartEndCheckbox): Promise<void> {
    switch (checkboxName) {
      case ScheduleStartEndCheckbox.START_WHEN_COURSE_OPENS:
        await this.startCourseCheckbox.click()
        this.startCourseCheckboxIsChecked = await this.startCourseCheckbox.isChecked()
        
        break;
      case ScheduleStartEndCheckbox.END_WHEN_COURSE_CLOSES:
        await this.endCourseCheckbox.click()
        this.endCourseCheckboxIsChecked = await this.endCourseCheckbox.isChecked()
        
        break;
      case ScheduleStartEndCheckbox.AUTOMATICALLY_MARK_NO_SHOW:
        await this.noShowCheckBox.click();
        this.isChecked = await this.noShowCheckBox.isChecked()
        break;
    }
  }

  async insertsNoShowOffsetMinutes(minutes: string): Promise<void> {
    if(this.isChecked){
        await this.noShowInput.click();
        await this.noShowInput.press(KeyboardCommands.CONTROL_A);
        await this.noShowInput.fill(minutes)
    }
  }

  async checkIfInputUpdated(): Promise<void> {
    if(this.isChecked){
       await expect(this.noShowInput).toBeEnabled()
    }else {
      await expect(this.noShowInput).toBeDisabled()
    }
  }

  async clickOnNewScheduleModal(): Promise <void> {
    await this.newScheduleModal.click()
  }

  async insertScheduleName(name: string): Promise <void> {
    await this.scheduleNameInput.fill(name)
  }

  async selectDate(startOrEndDate: string) {
    switch (startOrEndDate) {
      case ScheduleDate.START_DATE:
        await this.startDateIcon.click()
        await this.currentDayButton.click()
        break;
      case ScheduleDate.END_DATE:
        if(this.repeatInputValue === ScheduleRepeatOptions.DAILY || this.repeatInputValue === ScheduleRepeatOptions.WEEKLY ){
          await this.endDateIcon.click();
          await this.nextMonthButton.click();
          await this.endDate.click();
        }
        break;
    }
  }

  async insertStartTime(startTime: string): Promise <void> {
    if(!this.startCourseCheckboxIsChecked){   
      await this.startTimeArrowButton.click()
      await this.page.getByText(`${startTime}`, { exact: true }).click();
    }
  }

  async insertEndTime(endTime: string): Promise <void> {
    if(!this.endCourseCheckboxIsChecked){
      await this.endTimeArrowButton.click()
      await this.page.getByText(`${endTime}`, { exact: true }).click();
    }
  }

  

  async selectRepeatOption(repeatOption: string): Promise <void> {
    await this.repeatArrowButton.click();
    await this.repeatOptionsInput.fill(repeatOption);
    await this.page.keyboard.press(KeyboardCommands.ENTER);
    this.repeatInputValue = repeatOption
  }

  async selectDaysToRepeat(dayToRepeat: ScheduleWeekDays): Promise <void> {
    if(this.repeatInputValue === ScheduleRepeatOptions.WEEKLY){
      switch (dayToRepeat) {
        case ScheduleWeekDays.S:
          await this.page.getByRole('button', { name: `${dayToRepeat}`, exact: true }).click()
          break;
        case ScheduleWeekDays.M:
          await this.page.getByRole('button', { name: `${dayToRepeat}`, exact: true }).click()
          break;
        case ScheduleWeekDays.T:
          await this.page.getByRole('button', { name: `${dayToRepeat}`, exact: true }).click()
          break;
        case ScheduleWeekDays.W:
          await this.page.getByRole('button', { name: `${dayToRepeat}`, exact: true }).click()
          break;
        case ScheduleWeekDays.Th:
          await this.page.getByRole('button', { name: `${dayToRepeat}`, exact: true }).click()
          break;
        case ScheduleWeekDays.F:
          await this.page.getByRole('button', { name: `${dayToRepeat}`, exact: true }).click()
          break;
        case ScheduleWeekDays.Sa:
          await this.page.getByRole('button', { name: `${dayToRepeat}`, exact: true }).click()
          break;
      }
    } 
  }

  async saveModalChanges(){
    await this.saveModalChangesButton.click()
  }

  async clickNewlyCreatedSchedule(schedulName: string): Promise<void>{
    let elements = await this.allScheduleTitles.all();
    if(await this.allScheduleTitles.count() !== 0){
      for(let element of elements){
        if(await element.textContent() === schedulName){
          await element.click()
          return;
        }
      }
    }else {
      throw new Error("schedule not found");
    }
  } 

  async openOverideSection(): Promise<void> {
    this.newOverrideButton.click()
  }

  async insertOverrideName({overrideName}: rateOverrideData): Promise<void> {
    let overrideNameInputValue 
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let elements = await this.rateOverrideContainerList.all()
    for(let override of elements){
      overrideNameInputValue = await override.locator(".name-rate-group input.input").inputValue()
        if(overrideNameInputValue === ""){
          await override.locator(".name-rate-group input.input").fill(overrideName)
        }
    }
    if(await this.rateOverrideContainerList.count() === 0){
      this.overrideNameInput.fill(overrideName);
    }
  }

  async selectOverrideRate({overrideName}: rateOverrideData): Promise<void> {
    let overrideNameInputValue    
    let rateOverrideElements = await this.rateOverrideContainerList.all() 
      for(let override of rateOverrideElements){
        overrideNameInputValue = await override.locator(".name-rate-group input.input").inputValue()
        if(overrideNameInputValue === overrideName || overrideNameInputValue === ""){
          await override.locator('.name-rate-group [aria-autocomplete="list"]').click()
          await override.locator('.name-rate-group [aria-autocomplete="list"]').press(KeyboardCommands.ENTER)
        }
      }
    if(await this.rateOverrideContainerList.count() === 0){
      this.overideSelectInput.click();
      this.overideSelectInput.press(KeyboardCommands.ENTER);
    }
  }

  async insertOverrideAmount({overrideName, amount}: rateOverrideData): Promise<void> {
    let overrideNameInputValue    
    let rateOverrideElements = await this.rateOverrideContainerList.all() 
      for(let override of rateOverrideElements){
        overrideNameInputValue = await override.locator(".name-rate-group input.input").inputValue()
        if(overrideNameInputValue === overrideName || overrideNameInputValue === ""){
          await override.locator("input[type='number']").type(amount.toString())
        }
      }
    if(await this.rateOverrideContainerList.count() === 0){
      this.overrideAmountInput.type(amount.toString())
    }
  }

  async deleteRateOverrideByName(overrideName: string): Promise<void> {
    let overrideNameInputValue    
    let rateOverrideElements = await this.rateOverrideContainerList.all() 
      for(let override of rateOverrideElements){
        overrideNameInputValue = await override.locator(".name-rate-group input.input").inputValue()
        if(overrideNameInputValue === overrideName){
          await override.locator('.delete-button-container').click()
        }
      }
  }

  async checkBays(){
    let bays = await this.allBays.all()
    for(let bay of bays){
      await bay.locator('[type="checkbox"]').click()
    }
  }
  
  async checkBookingGroups(){
    let groups = await this.allBookingGroups.all()
    for(let group of groups){
      await group.locator('[type="checkbox"]').click()
    }
  }

  async assertSuccessfullyCreatedSchedule() {
    await this.page.getByRole('button', {name: 'month'}).click()
    await this.page.getByRole('button', {name: 'week'}).click()
    await expect(this.page.getByRole('button', {name: 'month'})).toBeVisible()
  }
}

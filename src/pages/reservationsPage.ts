import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { ScheduleRepeatOptions, ScheduleStartEndCheckbox, ScheduleWeekDays } from "../suport/enums/reservations.enum";
import { rateOverrideData } from "../suport/types/reservation.type";

export class ReservationsPage extends BasePage {

  private isChecked: boolean = false;
  private generalSettingsButton: Locator = this.page.locator(".menu-items-container > div:last-of-type");
  private reservationsPageButton: Locator = this.page.locator(".settings-menu button:nth-child(2)");
  private saveModalChangesButton: Locator = this.page.locator(".title-container button[type='submit']");
  
  // --- No-Show Section
  private noShowCheckBox: Locator = this.page.locator('input[name="markNoShows"]');
  private noShowInput: Locator = this.page.locator("label", {hasText: "No-Show Offset (minutes)"});
  private offsetMinutesInput: Locator = this.page.locator('div.section-container:nth-child(3) .input-container input')

  // --- Timeframe Section
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

  // --- Rate Override Section
  private newOverrideButton: Locator = this.page.locator('.schedules-modal-section-container > .divider-container > .group > .plus-sign > .svg-inline--fa')
  private overrideNameInput: Locator = this.page.locator('.name-rate-group input.input')
  private overideSelectInput: Locator = this.page.locator('.name-rate-group [aria-autocomplete="list"]')
  private overrideAmountInput: Locator = this.page.locator(".rate-override-container input[type='number']")
  private rateOverrideContainerList: Locator = this.page.locator(".schedules-modal-section-container .gap-7 ")

  // --- Bays and Booking Groups Section
  private allBays: Locator = this.page.locator('form .schedules-modal-container > div:nth-child(4) table tbody tr')
  private allBookingGroups: Locator = this.page.locator('form .schedules-modal-container > div:nth-child(5) table tbody tr')

  // --- All Schedules Calendar Section
  private allScheduleTitles: Locator = this.page.locator('table [role="row"] td .event-title');

  
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
    
      default:
        break;
    }
  }

  async insertsNoShowOffsetMinutes(minutes: string): Promise<void> {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(this.isChecked);
    if(this.isChecked){
        await this.noShowInput.click();
        await this.page.keyboard.press('Control+A');
        await this.noShowInput.type(minutes)
    }
  }

  async checkIfInputUpdated(noShowOffsetMinutes: string): Promise<void> {
    if(this.isChecked){
        const minutes = await this.offsetMinutesInput.inputValue()
        console.log(minutes)
        if(minutes !== noShowOffsetMinutes){
            throw new Error("The input has not been updated");
        }
    }
  }

  async clickOnNewScheduleModal(): Promise <void> {
    await this.newScheduleModal.click()
  }

  async insertScheduleName(name: string): Promise <void> {
    await this.scheduleNameInput.fill(name)
  }

  async selectStartDate(): Promise <void> {
    await this.startDateIcon.click()
    await this.currentDayButton.click()
  }

  async selectEndDate(): Promise <void> {
    if(this.repeatInputValue === ScheduleRepeatOptions.DAILY || this.repeatInputValue === ScheduleRepeatOptions.WEEKLY ){
      await this.endDateIcon.click();
      await this.nextMonthButton.click();
      await this.endDate.click();
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
    await this.page.keyboard.press('Enter');
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
    const elements = await this.allScheduleTitles.all();
    if(await this.allScheduleTitles.count() !== 0){

      for(const element of elements){
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

  async insertOverrideName({overrideName, amount}: rateOverrideData): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const elements = await this.page.locator('.schedules-modal-section-container .gap-7').all()
  let overrideNameInputValue 
  for(const override of elements){
    overrideNameInputValue = await override.locator(".name-rate-group input.input").inputValue()
        if(overrideNameInputValue === ""){
          await override.locator(".name-rate-group input.input").fill(overrideName)
        }
  }
    if(await this.rateOverrideContainerList.count() === 0){
      console.log('aici crapa la linia 208')
      this.overrideNameInput.fill(overrideName);
    }
  }

  async selectOverrideRate({overrideName, amount}: rateOverrideData): Promise<void> {
    const rateOverrideElements = await this.page.locator('.schedules-modal-section-container .gap-7').all() 
    let overrideNameInputValue    
      for(const override of rateOverrideElements){
        overrideNameInputValue = await override.locator(".name-rate-group input.input").inputValue()
        if(overrideNameInputValue === overrideName || overrideNameInputValue === ""){
          await override.locator('.name-rate-group [aria-autocomplete="list"]').click()
          await override.locator('.name-rate-group [aria-autocomplete="list"]').press("Enter")
        }
      }
    if(await this.rateOverrideContainerList.count() === 0){
      this.overideSelectInput.click();
      this.overideSelectInput.press("Enter");
    }
  }

  async insertOverrideAmount({overrideName, amount}: rateOverrideData): Promise<void> {
    const rateOverrideElements = await this.page.locator('.schedules-modal-section-container .gap-7').all() 
    let overrideNameInputValue    
      for(const override of rateOverrideElements){
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
    const rateOverrideElements = await this.rateOverrideContainerList.all() 
    let overrideNameInputValue    
      for(const override of rateOverrideElements){
        overrideNameInputValue = await override.locator(".name-rate-group input.input").inputValue()
        if(overrideNameInputValue === overrideName){
          await override.locator('.delete-button-container').click()
        }
      }
  }

  async checkBays(){
    const bays = await this.allBays.all()
    for(const bay of bays){
      await bay.locator('[type="checkbox"]').click()
    }
  }
  
  async checkBookingGroups(){
    const groups = await this.allBookingGroups.all()
    for(const group of groups){
      await group.locator('[type="checkbox"]').click()
    }
  }
}

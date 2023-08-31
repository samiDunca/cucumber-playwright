import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { ScheduleStartEndCheckbox, ScheduleWeekDays } from "../suport/enums/reservations.enum";

export class ReservationsPage extends BasePage {
  private isChecked: boolean = false;
  private generalSettingsButton: Locator = this.page.locator(".menu-items-container > div:last-of-type");
  private reservationsPageButton: Locator = this.page.locator(".settings-menu button:nth-child(2)");
  private saveButtonContainer: Locator = this.page.locator("div.save-button-container button");
  private saveModalChangesButton: Locator = this.page.locator('.title-container button');
  
  private noShowCheckBox: Locator = this.page.locator('input[name="markNoShows"]');
  private noShowInput: Locator = this.page.locator("label", {hasText: "No-Show Offset (minutes)",});
  private offsetMinutesInput: Locator = this.page.locator('div.section-container:nth-child(3) .input-container input')

  private newScheduleModal: Locator = this.page.locator('.plus-sign svg');
  private scheduleNameInput: Locator = this.page.locator('.name-container input');
  private startDateIcon: Locator = this.page.locator('.input-container > .svg-inline--fa').first();
  private currentDayButton: Locator = this.page.locator('.react-datepicker__month [aria-current="date"]');
  private endDateIcon: Locator = this.page.locator('div:nth-child(5) > .react-datepicker__input-container > .input-container > .svg-inline--fa');
  private nextMonthButton: Locator = this.page.locator('.react-datepicker svg.fa-arrow-right');
  private endDate: Locator = this.page.locator('.react-datepicker__week:nth-child(2) .react-datepicker__day:nth-child(4)');

  private startCourseCheckbox: Locator =  this.page.locator('div').filter({ hasText: /^Start when course opensEnd when course closes$/ }).getByRole('checkbox').first()
  private endCourseCheckbox: Locator =  this.page.locator('div').filter({ hasText: /^Start when course opensEnd when course closes$/ }).getByRole('checkbox').nth(1)
  public startCourseCheckboxIsChecked: boolean = false;
  public endCourseCheckboxIsChecked: boolean = false;

  private startTimeArrowButton: Locator = this.page.locator('.dropdown-arrow > svg').first()
  private endTimeArrowButton: Locator = this.page.locator('div').filter({ hasText: /^End TimeSelect\.\.\.$/ }).locator('svg')
  private repeatArrowButton: Locator = this.page.locator('div').filter({ hasText: /^RepeatSelect\.\.\.$/ }).locator('svg')
  private repeatOptionsInput: Locator = this.page.locator('.schedules-modal-section-container:nth-child(2) > .flex >.flex:nth-child(4) input')
  public repeatInputValue: string = '';


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
        this.isChecked = await this.noShowCheckBox.isChecked()
        break;
      case ScheduleStartEndCheckbox.END_WHEN_COURSE_CLOSES:
        await this.endCourseCheckbox.click()
        this.startCourseCheckboxIsChecked = await this.startCourseCheckbox.isChecked()
        break;
      case ScheduleStartEndCheckbox.AUTOMATICALLY_MARK_NO_SHOW:
        await this.noShowCheckBox.click();
        this.endCourseCheckboxIsChecked = await this.endCourseCheckbox.isChecked()
        break;
    
      default:
        break;
    }
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // this.isChecked = await this.noShowCheckBox.isChecked()
    // this.startCourseCheckboxIsChecked = await this.startCourseCheckbox.isChecked()
    // this.endCourseCheckboxIsChecked = await this.endCourseCheckbox.isChecked()
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

  async savePageModifications(): Promise<void> {
    await this.saveButtonContainer.click()
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
    await this.endDateIcon.click();
    await this.nextMonthButton.click();
    await this.endDate.click();
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
    if(this.repeatInputValue === 'Weekly'){
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

  async saveModalChanges(): Promise<void>{
    this.saveModalChangesButton.click()
  }
}
// IMPLEMENT CHECKBOX!!!!
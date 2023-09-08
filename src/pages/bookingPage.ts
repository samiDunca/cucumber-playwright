import { Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { BasePage } from "./basePage";
import { KeyboardCommands } from "../suport/enums/keyboardCommands.enum";
import { AccountData, CalendarButtonNames, CustomerRelated, ReservationData, ReservationStatus, ReservationTabButtons } from "../suport/enums/booking.enum";
import { memberData } from "../suport/types/member.type";

export class BookingPage extends BasePage {

    // Booking page
    private bayArrowRight: Locator = this.page.locator('.bay-arrows > div:last-child')
    private bayArrowLeft: Locator = this.page.locator('.bay-arrows button')

    private bayColumnList: Locator= this.page.locator('.bay_column .bay_title')
    private firstBayColumn: Locator = this.page.locator('.bay_column:nth-child(1) .bay_title')
    private teeTimeItem: Locator = this.page.locator('.tee_time_item')

    // Modal
    private exitModalButton: Locator = this.page.locator('.exit-button')
    private getNewReservationModalTitle: Locator = this.page.getByText('New Reservation')
    private popUpConfirmationMessageContainer: Locator =  this.page.locator('.notification-container')

    // Edit booking
    private reservationTypeSelect: Locator = this.page.locator('.indoor-create-booking-container > div:nth-child(2) > .select')
    private memberInformationInput: Locator = this.page.locator('.indoor-create-booking-container > div:nth-child(2) .member-information input')
    private startTimeInput: Locator = this.page.locator('.form-fields > .select:nth-child(2) input')
    private endTimeInput: Locator = this.page.locator('.form-fields > .select:nth-child(3) input')
    private bayInput: Locator = this.page.locator('.form-fields > .select:nth-child(4) input')
    private thirdBayFromDropdown: Locator = this.page.locator('#react-select-15-option-3')

    private firstMember: Locator = this.page.locator('#react-select-3-listbox #react-select-3-option-1')
    private incrementTimeButton = this.page.locator('.duration-buttons button:last-child')
    private editIcon = this.page.locator('.reservation-actions svg:first-child')
    private trashIcon = this.page.locator('.reservation-actions svg:last-child')
    
    // New customer 
    private customerFirstNameInput: Locator = this.page.locator('.rates-modal-accounting-container .input-container:nth-child(1) input')
    private customerLastNameInput: Locator = this.page.locator('.rates-modal-accounting-container .input-container:nth-child(2) input')
    private customerEmailInput: Locator = this.page.locator('.rates-modal-accounting-container .input-container:nth-child(3) input')
    private customerPhoneInput: Locator = this.page.locator('.rates-modal-accounting-container .input-container:nth-child(4) input')
    private newCostumerButton: Locator = this.page.locator('#react-select-3-listbox #react-select-3-option-0')
    private newCostumerSaveButton: Locator = this.page.locator('.title-container button:first-child')
    
    // Edit account data
    private firstNameInput: Locator = this.page.locator('.account-container .input-container:nth-child(2) input')
    private lastNameInput: Locator = this.page.locator('.account-container .input-container:nth-child(3) input')
    private phoneInput: Locator = this.page.locator('.account-container .input-container:last-child input')


    // Edit membership data
    private membershipPlan: Locator = this.page.locator('.form-container .select input');
    private membershipSelectOption: Locator = this.page.locator('#react-select-7-option-2') // #react-select-9-option-2
    private membershipCalendarIcon: Locator = this.page.locator('.form-container .react-datepicker-wrapper svg');
    private memberInfo: Locator = this.page.locator('.member-info')
    private treeDotsButton: Locator = this.page.locator('.current-membership .relative svg')

    // Calendar buttons
    private calendarIcon: Locator = this.page.locator('.tee-sheet-top .react-datepicker-wrapper')
    private calendarIconFromModal: Locator = this.page.locator('.form-fields > .react-datepicker-wrapper svg')
    private arrowRight: Locator =  this.page.locator('.react-datepicker__header [data-icon="arrow-right"]')
    private dateSelected: Locator =  this.page.locator('.react-datepicker__week:nth-child(3) .react-datepicker__day:nth-child(2)')
    private oneDateAfterDateSelected: Locator = this.page.locator('.react-datepicker__week:nth-child(3) .react-datepicker__day:nth-child(3)')
    private currentDateContainer: Locator = this.page.locator('.selected-date-container p.text-displayTwo')

    private returnToToday: Locator =  this.page.locator('.return-to-today')
    private tomorrow: Locator =  this.page.locator('.calendar-container button:nth-child(2)')
    private twoDaysFromToday: Locator = this.page.locator('.calendar-container button:nth-child(3)')
    private threeDaysFromToday: Locator = this.page.locator('.calendar-container button:nth-child(4)')
    private fourDaysFromToday: Locator = this.page.locator('.calendar-container button:nth-child(5)')
    private fiveDaysFromToday: Locator = this.page.locator('.calendar-container button:nth-child(6)')
    
    // Global var
    public currentDate: any;
    public memberName: string = '';
    public columnIndex: number = 1;
    public hourIndex: number = 1;
    public newStartTime: any;
    public newEndTime: any;
    public startTimeIndex: number = 0;
    public endTimeIndex: number = 0;


    async clickCalenderIcon() {
        await this.calendarIcon.click()
    }

    async selectDate() {
        await this.arrowRight.click()
        await this.dateSelected.click()
    }

    async selectDate2(){
        await this.calendarIconFromModal.click()
        await this.oneDateAfterDateSelected.click()
    }

    async selectBayByGivenTimeAndRandomColumn() {
        await this.firstBayColumn.waitFor()
        let bayColumnList: Locator[] = await this.bayColumnList.all();
        let teeTimeCount = await this.teeTimeItem.count();
        let bayColumnNames: any [] = [];
        for(let el of bayColumnList){
            bayColumnNames.push(await el.textContent())
        }
        for (let index = 1; index <= teeTimeCount; index++) {
            let element = await this.page.locator(`.tee_time_item:nth-child(${index})`).textContent()     
            if(element === '9:30a'){
                this.hourIndex = index
            }
        }
        do {   
            this.columnIndex = Math.floor(Math.random() * bayColumnNames.length + 1)
            await this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex})`).click()
            if(!this.getNewReservationModalTitle) {
                await this.page.locator('.exit-button').click()
            }
        } while (!this.getNewReservationModalTitle)
    }

    async selectBayByGivenColumnAndRandomTime(columnName: string) {
        await this.firstBayColumn.waitFor()
        let numberOfBays = await this.bayColumnList.count()
        for (let index = 1; index <= numberOfBays; index++) {
            let column = await this.page.locator(`.bay_column:nth-child(${index}) .bay_title`).textContent()
            if(column === columnName){
                this.columnIndex = index
            }
        }
        do {
            this.hourIndex = faker.number.int({min: 5, max: 44})
            await this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex})`).click()
            if(!this.getNewReservationModalTitle){
                await this.page.locator('.exit-button').click()
        
            }
        }while(!this.getNewReservationModalTitle)
    }

    async selectReservationType(tourType: string) {
        await this.reservationTypeSelect.locator('input').fill(tourType)
        await this.page.keyboard.press(KeyboardCommands.ENTER);
    }

    async selectMemberFromDropdown() {
        await this.memberInformationInput.click()
        await this.firstMember.waitFor()
        await this.firstMember.click({timeout: 1000})
    }

    async incrementDuration() {
        if(await this.incrementTimeButton.isEnabled()){
            this.incrementTimeButton.click()
        }
    }

    async clickReservationButton(buttonName: string) {
        switch (buttonName) {
            case CustomerRelated.CREATE_NEW_CUSTOMER:
                await this.memberInformationInput.click()
                await this.newCostumerButton.click()
                break;
            case CustomerRelated.SAVE_CUSTOMER:
                await this.newCostumerSaveButton.click()
                await this.customerEmailInput.waitFor({state: "hidden"})
                break;
            default:
                await this.page.getByRole('button', {name: `${buttonName}`}).click()
                break;
        }
    }

    async   saveMemberName() {
        let confirmationMessage = await this.popUpConfirmationMessageContainer.textContent()
        let pattern = /for\s(.*?)\sat/  
        let match = confirmationMessage?.match(pattern)
        if(match){
            this.memberName = match[1].replace(/\s+/g, ', ')
    
        }
    }

    async clickOnTheNewlyCreatedBooking() {
        this.startTimeIndex = 4
        this.endTimeIndex = 2
        this.newStartTime = await this.page.locator(`.tee_time_item:nth-child(${this.hourIndex - this.startTimeIndex})`).textContent()
        this.newEndTime = await this.page.locator(`.tee_time_item:nth-child(${this.hourIndex + this.endTimeIndex})`).textContent()
        await this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex})`).click()
    }

    async clickOnEditIcon() {
        await this.editIcon.click()
    }

    async changeReservationTime(startOrEndTime: ReservationData){
        switch (startOrEndTime) {
            case ReservationData.START_TIME:
                await this.startTimeInput.fill(this.newStartTime)
                await this.page.keyboard.press(KeyboardCommands.ENTER)
                break;
            case ReservationData.END_TIME:
                await this.endTimeInput.fill(this.newEndTime)
                await this.page.keyboard.press(KeyboardCommands.ENTER)
                break;
        }
    }

    async changeStartTime() {
        await this.startTimeInput.fill(this.newStartTime)
        await this.page.keyboard.press(KeyboardCommands.ENTER)
    }

    async changeEndTime() {
        await this.endTimeInput.fill(this.newEndTime)
        await this.page.keyboard.press(KeyboardCommands.ENTER)
    }

    async changeBookingStatus(statusName: string) {
    let statusLocator: Locator = this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - this.startTimeIndex}) .booking-status-container svg`)
    switch (statusName) {
        case ReservationStatus.BOOKED:
            await statusLocator.click()
            await this.page.getByText(ReservationStatus.BOOKED).click();
            break;
        case ReservationStatus.PAID:
            await statusLocator.click()
            await this.page.getByText(ReservationStatus.PAID).click();
            break;
        case ReservationStatus.CHECKED_IN:
            await statusLocator.click()
            await this.page.getByText(ReservationStatus.CHECKED_IN).click()
            break;
        case ReservationStatus.PLAYING:
            await statusLocator.click()
            await this.page.getByText(ReservationStatus.PLAYING).click()
            break;
        case ReservationStatus.NO_SHOW:
            await statusLocator.click()
            await this.page.getByText(ReservationStatus.NO_SHOW).click()
            break;
        case ReservationStatus.PENDING:
            await statusLocator.click()
            await this.page.getByText(ReservationStatus.PENDING).click()
            break;
        default:
            break;
        }
    }

    async assertStatusModification(statusName: string) {
        let statusLocator1: Locator = this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - this.startTimeIndex}) .booking-status-container`)
        switch (statusName) {
            case ReservationStatus.BOOKED:
                await statusLocator1.locator('[data-icon="calendar"]').click()
                break;
            case ReservationStatus.PAID:
                await expect(statusLocator1.locator('[data-icon="dollar-sign"]')).toBeVisible()
                break;
            case ReservationStatus.CHECKED_IN:
                await expect(statusLocator1.locator('[data-icon="check"]')).toBeVisible()
                break;
            case ReservationStatus.PLAYING:
                await expect(statusLocator1.locator('[data-icon="flag-pennant"]')).toBeVisible()
                break;
            case ReservationStatus.NO_SHOW:
                await expect(statusLocator1.locator('[data-icon="xmark"]')).toBeVisible()
                break;
            case ReservationStatus.PENDING:
                await expect(statusLocator1.locator('[data-icon="xmark"]')).toBeVisible()
                break;
            default:
                break;
        }
    }

    async assertBookingEdits() {
        await expect(this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - this.startTimeIndex})`)).toBeVisible()
    }

    async clickOnNewlyEditedBooking() {
        await this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - this.startTimeIndex})`).click()
    }

    async clickTrashIcon() {
        await this.trashIcon.click()
    }

    async assertionDeletedBooking() {
        await expect(this.popUpConfirmationMessageContainer).toContainText('was deleted')
        await expect(this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - this.startTimeIndex})`).filter({hasText: '+'})).toBeVisible()
    }

    async clickCalendarButton(buttonName: CalendarButtonNames): Promise<void> {
        switch (buttonName) {
            case CalendarButtonNames.RETURN_TO_TODAY:
                await this.returnToToday.click()
                break;
            case CalendarButtonNames.TOMORROW:
                this.currentDate = await this.tomorrow.locator('p.text-displayFive').textContent()
                await this.tomorrow.click()
                break;
            case CalendarButtonNames.TWO_DAYS_FROM_TODAY:
                this.currentDate = await this.twoDaysFromToday.locator('p.text-displayFive').textContent()
                await this.twoDaysFromToday.click()
                break;
            case CalendarButtonNames.THREE_DAYS_FROM_TODAY:
                this.currentDate = await this.threeDaysFromToday.locator('p.text-displayFive').textContent()
                await this.threeDaysFromToday.click()
                break;
            case CalendarButtonNames.FOUR_DAYS_FROM_TODAY:
                this.currentDate = await this.fourDaysFromToday.locator('p.text-displayFive').textContent()
                await this.fourDaysFromToday.click()
                break;
            case CalendarButtonNames.FIVE_DAYS_FROM_TODAY:
                this.currentDate = await this.fiveDaysFromToday.locator('p.text-displayFive').textContent()
                await this.fiveDaysFromToday.click()
                break;        
            default:
                break;
        }
    }

    async assertClickedCalendarButton(buttonName: CalendarButtonNames) {
        switch (buttonName) {
            case CalendarButtonNames.TODAY:
                await expect(this.page.getByText('TODAY')).toBeVisible()
            break;       
            default:
                await expect(this.currentDateContainer).toContainText(`${this.currentDate}`)
            break;
        }
    }

    async clickReservationTabButtons(buttonName: ReservationTabButtons){
        await this.page.getByText(`${buttonName}`).click()
    }


    // Edit account 

    async insertInUserData(inputName: AccountData, userData: memberData) {
        switch (inputName) {
            case AccountData.FIRST_NAME:
                await this.firstNameInput.fill(userData.firstName)
                break;
            case AccountData.LAST_NAME:
                await this.lastNameInput.fill(userData.lastName)
                break;
            case AccountData.PHONE:
                await this.phoneInput.fill(userData.phoneNumber.toString())
                break;
        }
    }

    async assertReservationAccount(userData: memberData) {
        await expect(this.memberInfo.locator('.name')).toHaveText(`${userData.firstName} ${userData.lastName}`)
        await expect(this.memberInfo.locator('a')).toHaveText(userData.phoneNumber.toString())
    }


    // Edit membership 

    async selectMembershipPlan() {
        await this.membershipPlan.click()
        await this.membershipSelectOption.isVisible()
        await this.membershipSelectOption.click({timeout: 10000})
    }
    
    async selectMembershipPlanStartDate(){
        await this.membershipCalendarIcon.click()
        await this.arrowRight.click()
        await this.dateSelected.click()
    }

    async assertMembershipModification(){
        await expect(this.page.getByText('Pending Deactivation')).toBeVisible()
    }

    async clickOnEditMembershipButton(){
        await this.treeDotsButton.click()
    }

    async assertionDeactivateMembership() {
        await expect(this.page.getByText('Add a Membership')).toBeVisible()
    }

    // Create Customer from booking modal

    async insertCustomerData(inputName: string, userData: memberData) {
        switch (inputName) {
            case AccountData.FIRST_NAME:
                await this.customerFirstNameInput.fill(userData.firstName)
                break;
            case AccountData.LAST_NAME:
                await this.customerLastNameInput.fill(userData.lastName)
                break;
            case AccountData.EMAIL:
                await this.customerEmailInput.fill(userData.email)
                break;
            case AccountData.PHONE:
                await this.customerPhoneInput.fill(userData.phoneNumber.toString())
                break;    
            default:
                break;
        }
    }
}

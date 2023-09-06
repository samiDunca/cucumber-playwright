import { Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { BasePage } from "./basePage";
import { KeyboardCommands } from "../suport/enums/keyboardCommands.enum";

export class BookingPage extends BasePage {
    private calendarIcon: Locator = this.page.locator('.tee-sheet-top .react-datepicker-wrapper')
    private arrowRight: Locator =  this.page.locator('.react-datepicker__header [data-icon="arrow-right"]')
    private dateSelected: Locator =  this.page.locator('.react-datepicker__week:nth-child(2)')

    private bayArrowRight: Locator = this.page.locator('.bay-arrows > div:last-child')
    private bayArrowLeft: Locator = this.page.locator('.bay-arrows button')

    private bayColumnList: Locator= this.page.locator('.bay_column .bay_title')
    private firstBayColumn: Locator = this.page.locator('.bay_column:nth-child(1) .bay_title')
    private teeTimeItem: Locator = this.page.locator('.tee_time_item')

    private exitModalButton: Locator = this.page.locator('.exit-button')
    private getNewReservationModalTitle: Locator = this.page.getByText('New Reservation')
    private popUpConfirmationMessageContainer: Locator =  this.page.locator('.notification-container')

    private reservationTypeSelect: Locator = this.page.locator('.indoor-create-booking-container > div:nth-child(2) > .select')
    private memberInformationInput = this.page.locator('.indoor-create-booking-container > div:nth-child(2) .member-information input')
    private newCostumerButton: Locator = this.page.locator('#react-select-3-listbox #react-select-3-option-0')
    private firstMember: Locator = this.page.locator('#react-select-3-listbox #react-select-3-option-1')
    private incrementTimeButton = this.page.locator('.duration-buttons button:last-child')
    private editIcon = this.page.locator('.reservation-actions svg:first-child')
    private trashIcon = this.page.locator('.reservation-actions svg:last-child')

    private startTimeInput = this.page.locator('.form-fields > .select:nth-child(2) input')

    public memberName: string = '';
    public columnIndex: number = 1;
    public hourIndex: number = 1;
    public newStartTime: any;
    public startTimeIndex: number = 0;


    async clickCalenderIcon() {
        await this.calendarIcon.click()
    }

    async selectData() {
        await this.arrowRight.click()
        await this.dateSelected.click()
    
    }

    async selectBayByGivenTimeAndRandomColumn() {
        await this.firstBayColumn.waitFor()
        const bayColumnList: Locator[] = await this.bayColumnList.all();
        let bayColumnNames: any [] = [];

        for(const el of bayColumnList){
            bayColumnNames.push(await el.textContent())
        }

        let teeTimeCount = await this.teeTimeItem.count();
        for (let index = 1; index <= teeTimeCount; index++) {
            const element = await this.page.locator(`.tee_time_item:nth-child(${index})`).textContent()     
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
            const column = await this.page.locator(`.bay_column:nth-child(${index}) .bay_title`).textContent()
            if(column === columnName){
                this.columnIndex = index
            }
        }
        do {
            this.hourIndex = faker.number.int({min: 1, max: 47})
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
        await this.firstMember.click({timeout: 500})
    }

    async incrementDuration() {
        if(await this.incrementTimeButton.isEnabled()){
            this.incrementTimeButton.click()
        }
    }

    async saveBookingButton(buttonName: string) {
        await this.page.getByRole('button', {name: `${buttonName}`}).click()
    }

    async saveMemberName() {
        const confirmationMessage = await this.popUpConfirmationMessageContainer.textContent()
        let pattern = /for\s(.*?)\sat/  
        const match = confirmationMessage?.match(pattern)
        if(match){
            this.memberName = match[1].replace(/\s+/g, ', ')
    
        }
    }

    async clickOnTheNewlyCreatedBooking() {
        this.startTimeIndex = 4
        this.newStartTime = await this.page.locator(`.tee_time_item:nth-child(${this.hourIndex - this.startTimeIndex})`).textContent()
        await this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex})`).filter({hasText: `${this.memberName}`}).click()
    }

    async clickOnEditIcon() {
        await this.editIcon.click()
    }

    async changeStartTime() {
        await this.startTimeInput.fill(this.newStartTime)
        await this.page.keyboard.press(KeyboardCommands.ENTER)
    }

    async changeBookingStatus(statusName: string) {
        const statusLocator: Locator = this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - this.startTimeIndex}) .booking-status-container svg`)
    switch (statusName) {
        case 'Booked':
            await statusLocator.click()
            await this.page.getByText('Booked').click();
            break;
        case 'Paid':
            await statusLocator.click()
            await this.page.getByText('Paid').click();
            break;
        case 'Checked In':
            await statusLocator.click()
            await this.page.getByText('Checked In').click()
            break;
        case 'Playing':
            await statusLocator.click()
            await this.page.getByText('Playing').click()
            break;
        case 'No-Show':
            await statusLocator.click()
            await this.page.getByText('No-Show').click()
            break;
        case 'Pending':
            await statusLocator.click()
            await this.page.getByText('Pending').click()
            break;
        default:
            break;
        }
    }

    async assertStatusModification(statusName: string) {
        const statusLocator1: Locator = this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - this.startTimeIndex}) .booking-status-container`)
        switch (statusName) {
            case 'Booked':
                await statusLocator1.locator('[data-icon="calendar"]').click()
                break;
            case 'Paid':
                await expect(statusLocator1.locator('[data-icon="dollar-sign"]')).toBeVisible()
                break;
            case 'Checked In':
                await expect(statusLocator1.locator('[data-icon="check"]')).toBeVisible()
                break;
            case 'Playing':
                await expect(statusLocator1.locator('[data-icon="flag-pennant"]')).toBeVisible()
                break;
            case 'No-Show':
                await expect(statusLocator1.locator('[data-icon="xmark"]')).toBeVisible()
                break;
            case 'Pending':
                await expect(statusLocator1.locator('[data-icon="xmark"]')).toBeVisible()
                break;
            default:
                break;
        }
    }

    async asertBookingEdits() {
        await expect(this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - this.startTimeIndex})`)).toHaveText(this.memberName)
    }

    async clickOnNewlyEditedBooking() {
        await this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - this.startTimeIndex})`).click()
    }

    async clickTrashIcon() {
        await this.trashIcon.click()
    }

    async assertionDeletedBooking() {
        await expect(this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - this.startTimeIndex})`).filter({hasText: '+'})).toBeVisible()
    }
}

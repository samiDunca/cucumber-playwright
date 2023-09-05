import { Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { BasePage } from "./basePage";

export class BookingPage extends BasePage {
    private calendarIcon: Locator = this.page.locator('.tee-sheet-top .react-datepicker-wrapper')
    private arrowRight: Locator =  this.page.locator('.react-datepicker__header [data-icon="arrow-right"]')
    private dateSelected: Locator =  this.page.locator('.react-datepicker__week:nth-child(2)')

    private bayArrowRight: Locator = this.page.locator('.bay-arrows > div:last-child')
    private bayArrowLeft: Locator = this.page.locator('.bay-arrows button')

    private bayColumnList: Locator= this.page.locator('.bay_column .bay_title')
    private teeTimeItem: Locator = this.page.locator('.tee_time_item')

    private exitModalButton: Locator = this.page.locator('.exit-button')
    private getNewReservationModalTitle = this.page.getByText('New Reservation')

    private reservationTypeSelect: Locator = this.page.locator('.indoor-create-booking-container > div:nth-child(2) > .select')
    private memberInformationInput = this.page.locator('.indoor-create-booking-container > div:nth-child(2) .member-information input')
    private incrementTimeButton = this.page.locator('.duration-buttons button:last-child')
    private editIcon = this.page.locator('.reservation-actions svg:first-child')
    private trashIcon = this.page.locator('.reservation-actions svg:last-child')

    private endTimeInput = this.page.locator('.form-fields > .select:nth-child(2) input')

    public memberName: string = '';
    public columnIndex: number = 1;
    public hourIndex: number = 1;
    public newStartTime: any;


    async clickCalenderIcon() {
        await this.calendarIcon.click()
    }

    async selectData() {
        await this.arrowRight.click()
        await this.dateSelected.click()
    }

    async selectBayByGivenTimeAndRandomColumn() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
                // const plusCasette =  await this.page.locator(`.bay_column:nth-child(${bayColumnIndex}) > .bay_bookings > div:nth-child(${index})`).click()      
            }
        }
        do {   
            if(!this.getNewReservationModalTitle) {
                console.log('if-ul pentru exit button')
                await this.page.locator('.exit-button').click()
            }
            this.columnIndex = Math.floor(Math.random() * bayColumnNames.length + 1)
            await this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex})`).click()
        } while (!this.getNewReservationModalTitle)
    }

    async selectBayByGivenColumnAndRandomTime(columnName: string) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let numberOfBays = await this.bayColumnList.count()
        console.log({numberOfBays})
        for (let index = 1; index < numberOfBays; index++) {
            const column = await this.page.locator(`.bay_column:nth-child(${index}) .bay_title`).textContent()
            console.log({column})
            if(column === columnName){
                this.columnIndex = index
            }
        }
        do {
            this.hourIndex = faker.number.int({min: 1, max: 47})
            await this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex})`).click()
            if(!this.getNewReservationModalTitle){
                await this.page.locator('.exit-button').click()
                console.log('vom incerca din nou sa generam un fake')
            }
        }while(!this.getNewReservationModalTitle)
    }

    async selectReservationType(tourType: string) {
        await this.reservationTypeSelect.locator('input').fill(tourType)
        await this.page.keyboard.press('Enter');
    }

    async selectMemberFromDropdown() {
        await this.memberInformationInput.click()
        await new Promise((resolve) => setTimeout(resolve, 500));
        await this.memberInformationInput.press('ArrowDown')
        await this.page.keyboard.press('Enter');
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
        const consfirmationMessage = await this.page.locator('.notification-container').textContent()
        this.newStartTime = await this.page.locator(`.tee_time_item:nth-child(${this.hourIndex - 4})`).textContent()  
        let pattern = /for\s(.*?)\sat/
        const match = consfirmationMessage?.match(pattern)
        if(match){
            this.memberName = match[1].replace(/\s+/g, ', ')
            console.log(this.memberName)
        }
    }

    async clickOnTheNewlyCreatedBooking() {
        await this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex})`).filter({hasText: `${this.memberName}`}).click()
    }

    async clickOnEditIcon() {
        await this.editIcon.click()
    }

    async changeEndTime() {
        await this.endTimeInput.fill(this.newStartTime)
        await this.page.keyboard.press('Enter')
    }

    async changeBookingStatus(statusName: string) {
        const statusLocator: Locator = this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - 4}) .booking-status-container svg`)
    switch (statusName) {
        case 'Booked':
            await statusLocator.click()
            await this.page.getByText('Booked').click();
            await statusLocator.click()
            await this.page.getByText('Booked').click();
            await new Promise((resolve) => setTimeout(resolve, 2000));
            break;
        case 'Paid':
            await statusLocator.click()
            await this.page.getByText('Paid').click();
            await new Promise((resolve) => setTimeout(resolve, 2000));
            break;
        case 'Checked In':
            await statusLocator.click()
            await this.page.getByText('Checked In').click()
            await new Promise((resolve) => setTimeout(resolve, 2000));
            break;
        case 'Playing':
            await statusLocator.click()
            await this.page.getByText('Playing').click()
            await new Promise((resolve) => setTimeout(resolve, 2000));
            break;
        case 'No-Show':
            await statusLocator.click()
            await this.page.getByText('No-Show').click()
            await new Promise((resolve) => setTimeout(resolve, 2000));
            break;
        case 'Pending':
            await statusLocator.click()
            await this.page.getByText('Pending').click()
            await new Promise((resolve) => setTimeout(resolve, 2000));
            break;
        default:
            break;
        }
    }

    async assertStatusModification(statusName: string) {
        const statusLocator1: Locator = this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - 4}) .booking-status-container`)
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
        console.log(this.memberName)
        await expect(this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - 4})`)).toHaveText(this.memberName)
    }

    async clickOnNewlyEditedBooking() {
        await this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - 4})`).click()
    }

    async clickTrashIcon() {
        await this.trashIcon.click()
    }

    async assertionDeletedBooking() {
        await expect(this.page.locator(`.bay_column:nth-child(${this.columnIndex}) > .bay_bookings > div:nth-child(${this.hourIndex - 4})`).filter({hasText: '+'})).toBeVisible()
    }
}

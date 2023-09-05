import { Locator, expect } from "@playwright/test";

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
    public randomColumnIndexAlias: number = 1;
    public hourIndexAlias: number = 1;
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
    const bayColumnList: Locator[] = await this.page.locator('.bay_column .bay_title').all();
    let bayColumnNames: any [] = [];

    for(const el of bayColumnList){
        bayColumnNames.push(await el.textContent())
    }

    let hourIndex: number = 1;
    let teeTimeCount = await this.teeTimeItem.count();
    for (let index = 1; index <= teeTimeCount; index++) {
        const element = await this.page.locator(`.tee_time_item:nth-child(${index})`).textContent()     
        if(element === '9:30a'){
            hourIndex = index
            this.hourIndexAlias = index
            // const plusCasette =  await this.page.locator(`.bay_column:nth-child(${bayColumnIndex}) > .bay_bookings > div:nth-child(${index})`).click()      
        }
    }
    do {   
        if(!this.getNewReservationModalTitle) {
            console.log('if-ul pentru exit button')
            await this.page.locator('.exit-button').click()
        }
        const randomColumnIndex = Math.floor(Math.random() * bayColumnNames.length + 1)
        this.randomColumnIndexAlias = randomColumnIndex
        const randomColumnName = bayColumnNames[randomColumnIndex]
        const plusCasette =  await this.page.locator(`.bay_column:nth-child(${randomColumnIndex}) > .bay_bookings > div:nth-child(${hourIndex})`).click()
    } while (!this.getNewReservationModalTitle)
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
        this.newStartTime = await this.page.locator(`.tee_time_item:nth-child(${this.hourIndexAlias - 4})`).textContent()  
        let pattern = /for\s(.*?)\sat/
        const match = consfirmationMessage?.match(pattern)
        if(match){
            this.memberName = match[1].replace(/\s+/g, ', ')
        }
    }

    async clickOnTheNewlyCreatedBooking() {
        await this.page.locator(`.bay_column:nth-child(${this.randomColumnIndexAlias}) > .bay_bookings > div:nth-child(${this.hourIndexAlias})`).filter({hasText: `${this.memberName}`}).click()
    }

    async clickOnEditIcon() {
        await this.editIcon.click()
    }

    async changeEndTime() {
        await this.endTimeInput.fill(this.newStartTime)
        await this.page.keyboard.press('Enter')
    }

    async changeBookingStatus(statusName: string) {
        const statusLocator: Locator = this.page.locator(`.bay_column:nth-child(${this.randomColumnIndexAlias}) > .bay_bookings > div:nth-child(${this.hourIndexAlias - 4}) .booking-status-container svg`)
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
        const statusLocator1: Locator = this.page.locator(`.bay_column:nth-child(${this.randomColumnIndexAlias}) > .bay_bookings > div:nth-child(${this.hourIndexAlias - 4}) .booking-status-container`)
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
        await expect(this.page.locator(`.bay_column:nth-child(${this.randomColumnIndexAlias}) > .bay_bookings > div:nth-child(${this.hourIndexAlias - 4})`)).toHaveText(this.memberName)
    }

    async clickOnNewlyEditedBooking() {
        await this.page.locator(`.bay_column:nth-child(${this.randomColumnIndexAlias}) > .bay_bookings > div:nth-child(${this.hourIndexAlias - 4})`).click()
    }

    async clickTrashIcon() {
        await this.trashIcon.click()
    }

    async assertionDeletedBooking() {
        await expect(this.page.locator(`.bay_column:nth-child(${this.randomColumnIndexAlias}) > .bay_bookings > div:nth-child(${this.hourIndexAlias - 4})`).filter({hasText: '+'})).toBeVisible()
    }
}

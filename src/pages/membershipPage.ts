
import { Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class MembershipPage extends BasePage {
    private generalSettingsButton: Locator = this.page.locator(".menu-items-container > div:last-of-type");
    private membershipsButton: Locator = this.page.locator(".settings-menu button:nth-of-type(4)");
    private plusButton: Locator = this.page.locator(".plus-sign > .svg-inline--fa");

    // New Membership Modal
    private saveModalButton: Locator = this.page.locator(".title-container button");
    private membershipNameInput: Locator = this.page.locator('.name-container input');
    private bookingGroupDropdown: Locator = this.page.locator('.new-plan-modal-container > div:nth-child(3) input');
    private secondBookingGroupOption: Locator = this.page.locator('.new-plan-modal-container > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div > div:nth-child(2)'); 
    private bookingGroupList: Locator = this.page.locator('.new-plan-modal-container > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div > div')
    private popUpConfirmationMessageContainer: Locator =  this.page.locator('.notification-container')


    async userNavigatesToMembershipPage(): Promise<void> {
        
        await this.generalSettingsButton.click()
        await this.membershipsButton.click();
      }

    async insertMembershipName(membershipName: string) {
        await this.membershipNameInput.fill(membershipName)
    }

    async selectBookingGroup(bookingGroupName: string) {
        await this.bookingGroupDropdown.click()
        await this.secondBookingGroupOption.waitFor() 
        await this.secondBookingGroupOption.click() 
    }
    
    async openNewMembershipPlanModal(){
        await this.plusButton.click()
    }
    
    async selectBookingGroupByName(bookingGroupName: string){
        await this.bookingGroupDropdown.click() 
        let bookingGroups = await this.bookingGroupList.all()
        for(let group of bookingGroups){
            if(bookingGroupName === await group.textContent()){
                await group.click()
            }
        }
    }

    async saveModalChanges() {
        await this.saveModalButton.click()
    }

    async assertMembershipCreation(membershipName: string) {
        await expect(this.popUpConfirmationMessageContainer).toContainText(membershipName)
    }
}
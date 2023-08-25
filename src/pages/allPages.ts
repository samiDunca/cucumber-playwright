import { BasePage } from "./basePage";
import { LoginPage } from "./loginPage";
import { MemberPage } from "./memberPage";
import { CustomerPage } from "./customerPage";
import { BrowserContext, Page } from "@playwright/test";
// import { BookingEnginePage } from "./bookingEnginePage";

export class AllPages {
    loginPage: LoginPage;
    basePage: BasePage;
    memberPage: MemberPage;
    customerPage: CustomerPage;
    // bookingEngine: BookingEnginePage;

    constructor(public page: Page, public context: BrowserContext){
        this.basePage = new BasePage(page, context);
        this.loginPage = new LoginPage(page, context);
        this.memberPage = new MemberPage(page, context);
        this.customerPage = new CustomerPage(page, context);
    }
}
// comment
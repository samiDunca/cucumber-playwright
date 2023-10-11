import { BrowserContext, Page } from "@playwright/test";

import { BasePage } from "./basePage";
import { LoginPage } from "./loginPage";
import { BookingEnginePage } from "./bookingEnginePage";
import { ReservationsPage } from "./reservationsPage";
import { BookingPage } from "./bookingPage";
import { MembershipPage } from "./membershipPage";

export class AppPages {
    basePage: BasePage;
    loginPage: LoginPage;
    bookingEnginePage: BookingEnginePage;
    membershipPage: MembershipPage;
    reservationsPage: ReservationsPage;
    bookingPage: BookingPage;

    constructor(public page: Page, public context: BrowserContext){
        this.basePage = new BasePage(page, context);
        this.loginPage = new LoginPage(page, context);
        this.bookingEnginePage = new BookingEnginePage(page, context);
        this.membershipPage = new MembershipPage(page, context)
        this.reservationsPage = new ReservationsPage(page, context);
        this.bookingPage = new BookingPage(page, context)
    }
}

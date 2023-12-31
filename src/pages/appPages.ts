import { BrowserContext, Page } from "@playwright/test";

import { BasePage } from "./basePage";
import { LoginPage } from "./loginPage";
import { MemberPage } from "./memberPage";
import { CustomerPage } from "./customerPage";
import { BookingEnginePage } from "./bookingEnginePage";
import { ReservationsPage } from "./reservationsPage";
import { BookingPage } from "./bookingPage";

export class AppPages {
    basePage: BasePage;
    loginPage: LoginPage;
    memberPage: MemberPage;
    customerPage: CustomerPage;
    bookingEnginePage: BookingEnginePage;
    reservationsPage: ReservationsPage;
    bookingPage: BookingPage;

    constructor(public page: Page, public context: BrowserContext){
        this.basePage = new BasePage(page, context);
        this.loginPage = new LoginPage(page, context);
        this.memberPage = new MemberPage(page, context);
        this.customerPage = new CustomerPage(page, context);
        this.bookingEnginePage = new BookingEnginePage(page, context);
        this.reservationsPage = new ReservationsPage(page, context);
        this.bookingPage = new BookingPage(page, context)
    }
}

import { Page, BrowserContext } from "@playwright/test";

export class BasePage {
    page: Page;
    context: BrowserContext;

    constructor(page: Page, context: BrowserContext){
        this.page = page;
        this.context = context;
    }

    public goto(optionalUrl: string): Promise<any> {
        return this.page.goto(optionalUrl);
    }
}
// comment
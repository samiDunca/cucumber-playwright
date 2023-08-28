import { chromium, Page, Browser, BrowserContext } from "@playwright/test";
import { Before, setDefaultTimeout } from "@cucumber/cucumber";

import { EnvironmentHandler } from "../env/models/environmentHandler";
import { ICustomWorld } from "../world/customWorld";
import { AppPages } from "../pages/appPages";

setDefaultTimeout(3 * 5000);

let browser: Browser;
let page: Page;
let context: BrowserContext;
let env: EnvironmentHandler;

Before(async function (this: ICustomWorld) {
  browser = await chromium.launch({ headless: false });
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.pagesObj = new AppPages(this.page, this.context);
});

export { page, env };

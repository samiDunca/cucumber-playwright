import { chromium, Page, Browser, BrowserContext } from "@playwright/test";

import {
  AfterAll,
  Before,
} from "@cucumber/cucumber";

import { EnvironmentHandler } from "../env/models/EnvironmentHandler";
import { CustomWorldBeforeSetup } from "../world/custom-world";
import { AllPages } from "../pages/allPages";

let browser: Browser;
let page: Page;
let context: BrowserContext;
let env: EnvironmentHandler;

Before(async function (this: CustomWorldBeforeSetup) {
  browser = await chromium.launch({ headless: false });
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.pagesObj = new AllPages(this.page, this.context);
});

AfterAll(async () => {
  // await pageFixture.page.close();
  // await browser.close();F
});

export { page, env }; 
// comment
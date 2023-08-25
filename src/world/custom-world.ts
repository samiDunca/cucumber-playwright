import { BrowserContext, Page } from "@playwright/test";
import { AllPages } from "../pages/allPages";
import { IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber";
import { EnvironmentHandler } from "../env/models/EnvironmentHandler";

export interface CustomWorldBeforeSetup extends World {
  context?: BrowserContext;
  page?: Page;
  pagesObj: AllPages;

  env: EnvironmentHandler;
}

export class CustomWorld extends World implements CustomWorldBeforeSetup {
  constructor(options: IWorldOptions) {
    super(options);
  }

  env: EnvironmentHandler = new EnvironmentHandler();
  pagesObj: AllPages = {} as AllPages;
}

setWorldConstructor(CustomWorld);

// comment
import { BrowserContext, Page } from "@playwright/test";
import { IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber";

import { AppPages } from "../pages/appPages";
import { EnvironmentHandler } from "../env/models/environmentHandler";

export interface ICustomWorld extends World {
  context?: BrowserContext;
  page?: Page;
  pagesObj: AppPages;

  env: EnvironmentHandler;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }

  env: EnvironmentHandler = new EnvironmentHandler();
  pagesObj: AppPages = {} as AppPages;
}

setWorldConstructor(CustomWorld);

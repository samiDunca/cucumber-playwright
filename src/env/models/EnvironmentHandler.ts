import fs from "fs";
import path from "path";

import TestData from "./environment";

interface JsonData {
  url: string;
  validUsers: TestData.UserCredentials[];
  invalidUsers: TestData.UserCredentials[];
}

export class EnvironmentHandler {
  private readonly _data: JsonData;

  constructor() {
    const rawJson: string = fs.readFileSync(
      path.resolve(__dirname, "../data/userData.json"),
      "utf-8"
    );
    this._data = JSON.parse(rawJson) as JsonData;
  }

  public getEnv(): JsonData {
    return this._data;
  }

  public getUrl(): string {
    return this._data.url;
  }

  public getValidUsers(): TestData.UserCredentials[] {
    return this._data.validUsers;
  }

  public getInvalidUsers(): TestData.UserCredentials[] {
    return this._data.invalidUsers;
  }
}

import { PlaywrightTestConfig } from "@playwright/test";
import { defineConfig } from "@playwright/test";
require("dotenv").config();

export default defineConfig({
  timeout: 60000,
  retries: 0,
//   testDir: "src/api-test/bookingGroups",
//   testDir: "src/api-test/bookings",
//   testDir: "src/api-test/diagnostics",
//   testDir: "src/api-test/organizations",
  testDir: "src/api-test/schedules",
//   testDir: "src/api-test/servicePoints",
//   testDir: "src/api-test/users",
  use: {
    baseURL: "https://tq-golf-dev-api.azurewebsites.net",
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      Organizationid: `${process.env.ORGANIZATION_ID}`
    },
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
  ],
});

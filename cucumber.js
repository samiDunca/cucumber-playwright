module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/features/bookingEngine.feature"],
    dryRun: false,
    require: [
      "src/steps/*.ts",
      "src/setup/hooks.ts",
      "src/world/customWorld.ts",
      "/playwright.config.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:./src/test-result/cucumber-report.html",
    ],
  },
  globals: {
    "ts-jest": {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};

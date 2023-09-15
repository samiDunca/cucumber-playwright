module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    // paths: ["src/features/membership.feature"],
    dryRun: false,
    require: [
      "src/steps/*.ts",
      "./hooks.ts",
      "src/world/customWorld.ts",
      "./playwright.config.ts",
    ],
    requireModule: ["ts-node/register"],
    format: ["progress-bar", "html:src/test-result/cucumber-report.html", "json:src/test-result/cucumber-report.json"],
  },
  globals: {
    "ts-jest": {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};

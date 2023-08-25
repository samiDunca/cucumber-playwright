module.exports = {
  // default: `--format-options '{"snippetInterface": "synchronous"}'`
  default: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/features/member.feature"],
    dryRun: false,
    require: [
      "src/steps/*.ts",
      "src/setup/hooks.ts",
      "src/world/custom-world.ts",
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:./src/test-result/cucumber-report.html",
      "json:test-result/cucumber-report.json",
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

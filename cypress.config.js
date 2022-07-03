const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const report = require("multiple-cucumber-html-reporter");

const setupNodeEvents = async (on, config) => {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  return config;
};

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://jsonplaceholder.cypress.io",
    responseTimeout: 5000,
    specPattern: "**/*.feature",
    supportFile: false,
    video: false,
    setupNodeEvents,
  },
});

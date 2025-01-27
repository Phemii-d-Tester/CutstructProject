const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    },
    chromeWebSecurity: false,
    experimentalInteractiveRunEvents: true,
    experimentalMemoryManagement: true,
    experimentalRunAllSpecs: true,
    watchForFileChanges: false,
    defaultCommandTimeout:20000,
    baseUrl:"https://staging-fe-v2.cutstruct.com/",
    env: {
      "MAILSLURP_API_KEY":"bc8fdb54288a9010853acd894137c71c4639e63a9ff38ae7ae1e714b46331b6c"
   },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return {
        ...config,
        browsers: [
          ...config.browsers,
          {
            name: 'Chromium',
            family: 'chromium',
            displayName: 'Chromium',
            version: '126.0.6436.0', 
            path: "C:\\Users\\olufemi.habib\\AppData\\Local\\Chromium\\Application\\chrome.exe", 
            majorVersion: '109.0' 
          }
        ]
      };
      
    },
  },
});

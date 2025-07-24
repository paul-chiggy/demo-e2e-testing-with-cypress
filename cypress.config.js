import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://todomvc.com',
    viewportWidth: 1280,
    viewportHeight: 1024,
    retries: {
      runMode: 3,
      openMode: 0,
    },
    specPattern: 'cypress/e2e/**/*.ts',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
    }
  },
})
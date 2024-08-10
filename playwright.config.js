import { PlaywrightTestConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = PlaywrightTestConfig = {
  testDir: './src/tests',
  testMatch: ["tests/LoginTests.spec.js"],
  outputDir: "./test-results/failure",
  timeout: 100 * 1000, // Maximum time one test can run for
  expect: {
    timeout: 5000
  },
  fullyParallel: !true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI ? [["junit", {
    outputFile: "results.xml"
  }]] : [["json", {
    outputFile: "report.json"
  }], ["html", {
    open: "on-failure"
  }]],
  // use: {
  //   baseURL: 'https://dev.truckman4.com/',
  //   headless: false,
  //   trace: 'on-first-retry',
  //   screenshot: 'only-on-failure',
  //   video: 'retain-on-failure',
  //   downloadsPath: "./test-results/downloads",
  // },
  use: {
    baseURL: 'https://dev.truckman4.com/',
    headless: process.env.CI ? true : false,
    trace: process.env.CI ? "off" : "on",
    screenshot: process.env.CI ? "off" : "on",
    video: process.env.CI ? "off" : "on",
  },
  reporter: [
    ['list'], 
    ['allure-playwright', {
      outputFolder: 'allure-results' 
    }],
    ['html', { open: 'never', outputFolder: "./test-results/report" }],
    ["./src/Logger/TestListener.js"],
  ],   
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
};

export default config;

/*
 * @author Anil Kumar
 * 
 * playwright.config base file
 * here we are declaring browser, browserstack user name , browserstack password
 */

import { defineConfig, devices } from '@playwright/test';

const username = process.env.BS_USERNAME!;
const accessKey = process.env.BS_ACCESS_KEY!;
const sandboxEnv = process.env.SANDBOX_ENV!;
const QAprojectName = process.env.PROJECT_NAME!;
const hasBSCreds: boolean = false; // Set to false for local testing
const timestamp  = new Date().toISOString()
      .replace(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*$/, '$3_$2_$1-T$4$5')
const STATIC_BUILD_NAME = `${QAprojectName}_${sandboxEnv}`; // Optional: Use a static build name for easier grouping in BS dashboard


// Common capability payload (customize project/build names as needed)
function capsFor(projectName: string, browser?: string, os?: string, osVersion?: string, device?: string, realMobile?: boolean) {

  return {
    'browserstack.username': username,
    'browserstack.accessKey': accessKey,
    project: "QA_LeadManagement",
    build: STATIC_BUILD_NAME,
    buildTag: timestamp,  
    name: QAprojectName,

    // Desktop caps
    browser,
    os,
    os_version: osVersion,
    // Mobile caps
    device,
    realMobile,
    // Helpful extras
    'browserstack.console': 'info',           // 'disable' | 'errors' | 'warnings' | 'info' | 'verbose'
    'browserstack.networkLogs': true,
    'browserstack.video': true,
    'browserstack.maskCommands': 'setValues,clearValues', // useful for sensitive forms like Salesforce creds
  };
}

function wsEndpoint(caps: Record<string, any>) {
  const encoded = encodeURIComponent(JSON.stringify(caps));
  return `wss://cdp.browserstack.com/playwright?caps=${encoded}`;
}

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Retry only */
  retries:1,

  reporter: [["line"], ["html", { open: "never" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://test.salesforce.com/',
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  timeout: 90000, // 90 seconds for each test
  expect: {
    timeout: 10000, // default expect timeout (locators, assertions)
  },
  /* Configure projects for major browsers */
  /* if bollean hasBSCode is true, application will run browserstack */
  /* if bollean hasBSCode is false, application will run browserstack */
  projects: [
    ...(hasBSCreds
      ? [
        {
          name: 'BS - Chrome@Win11',
          use: {
            connectOptions: {
              wsEndpoint: wsEndpoint(capsFor('Chrome@Win11', 'chrome', 'Windows', '11')),
            },
            viewport: { width: 1920, height: 1080 },
          },
        },
      ]
      : [
        {
          name: 'chrome',
          use: {
            ...devices['Desktop Chrome'],
            viewport: { width: 1500, height: 700 },
          },

        }
      ]),


  ],
});

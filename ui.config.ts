import { PlaywrightTestConfig, defineConfig} from '@playwright/test'
import Browser from './src/utils/Browser';
import dotenv from 'dotenv';

// Read from default ".env" file.
dotenv.config();

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: Number.parseInt(process.env.RETRIES!, 10),
  testDir: 'src/tests/ui-functional',
  reporter: [
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: false,
        environmentInfo: {
          OS: process.platform.toUpperCase(),
        },
      },
    ],
  ],
  use: {
    browserName: Browser.type(process.env.BROWSER!),
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'on',
    launchOptions: {
      headless: false,
      slowMo: 100,
    },
    acceptDownloads: true,
  },
  // projects: [
  //   {
  //     name: 'Chromium',
  //     use: { browserName: 'chromium' },
  //   },
  //   {
  //     name: 'Firefox',
  //     use: { browserName: 'firefox' },
  //   },
  //   {
  //     name: 'Webkit',
  //     use: { browserName: 'webkit' },
  //   },
  // ],
}

export default config

import { test, expect } from "@playwright/test";
import { Page } from "@playwright/test";
import EXAMPLE from "../pomPages/examplepom";

let page: Page;
let example: EXAMPLE;

let url: string = "https://practice.sdetunicorns.com";

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  example = new EXAMPLE(page);
});


test.use({
  viewport: { width: 1536, height: 776 },
  launchOptions: {
    slowMo: 300, //This option will sets the execution speed of the test.
  },
});

test.describe("Performing the End to End TC of an e-Commerce Website", () => {
  
    test(`Register and Home Button`, async () => {
      await test.step("Open application & navigating to Website", async () => {
        await page.goto(url);
      });

      await test.step("User Register and Navigating Home", async () => {
        await example.RegisterandHome();
      });

    });

});

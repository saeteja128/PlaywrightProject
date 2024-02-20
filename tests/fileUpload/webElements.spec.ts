import { test, Page } from "@playwright/test";
import COMMONMETHODS from "../commonMethods/commonMethods";

let url: string = "https://practice.sdetunicorns.com/";

// let url: string = "https://www.lambdatest.com/selenium-playground/";

test.use({
  viewport: { width: 1536, height: 776 },
  launchOptions: {
    slowMo: 400, //This option will sets the execution speed of the test.
  },
});

let page: Page;
let commonMethods: COMMONMETHODS;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  commonMethods = new COMMONMETHODS(page);
});

test.describe("Performing the Other Test Cases in Lamda Test Website", () => {
  test(`Uploading a file demo`, async () => {
    await test.step("Navigating to Lamda URL", async () => {
      await commonMethods.navigate(url);
    });
    await test.step("Navigating to File Upload Menu", async () => {
      await commonMethods.uploadFile();
    });
  });

  // test(`Demo on Drag and Drop Elements`, async () => {
  //   await test.step("Navigating to Lamda URL", async () => {
  //     await commonMethods.navigate(url);
  //   });
  //   await test.step("Navigating to File Upload Menu", async () => {
  //     await commonMethods.dragAndDrop();
  //   });
  // });

  // test(`Demo on Slider Elements`, async () => {
  //   await test.step("Navigating to Lamda URL", async () => {
  //     await commonMethods.navigate(url);
  //   });
  //   await test.step("Navigating to File Upload Menu", async () => {
  //     await commonMethods.sliderElement();
  //   });
  // });
});

import { test, Page } from "@playwright/test";
import { SIGNINPAGE, signincolumns } from "../pomPages/signIn";
import COMMONBASE, { fileContent } from "../pomPages/commonBase";
import { PRODUCTSELECTION } from "../pomPages/productSelection";
import { parse } from "csv-parse/sync";

let page: Page;
let signInPage: SIGNINPAGE;
let commonBase: COMMONBASE;
let productSelection: PRODUCTSELECTION;

let url: string = "https://magento.softwaretestingboard.com/";

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  signInPage = new SIGNINPAGE(page);
  commonBase = new COMMONBASE(page);
  productSelection = new PRODUCTSELECTION(page);
});
test.use({
  viewport: { width: 1536, height: 776 },
  launchOptions: {
    slowMo: 300, //This option will sets the execution speed of the test.
  },
});

const signinrecords: any = parse(fileContent, {
  delimiter: ",",
  columns: signincolumns,
  fromLine: 2,
  skip_empty_lines: true,
});

let csvCount: number;
csvCount = signinrecords.length;
console.log("Result", signinrecords);

test.describe("Performing the End to End TC of an e-Commerce Website", () => {
  for (let i = 0; i < csvCount; i++) {
    test(`Existing User Sign In/New User Account Creation ${i}`, async () => {
      await test.step("Open application & navigating to Website", async () => {
        await commonBase.navigate(url);
      });

      await test.step("User Sign In/Sign Up Step based on the CSV input", async () => {
        await signInPage.SignIn_SignUp(signinrecords[i]);
      });

      await test.step("Navigating to the Product Category Page ", async () => {
        await productSelection.HoveringOnMenDropDown();
        await productSelection.HoveringOnTopsDropDown();
        await productSelection.SelectiongHoodiesOption();
      });
    });
  }
});

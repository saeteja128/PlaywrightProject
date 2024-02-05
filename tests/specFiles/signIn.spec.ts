import { test, Page } from "@playwright/test";
import { SIGNINPAGE, signincolumns } from "../pomPages/signIn";
import COMMONBASE, { fileContent } from "../pomPages/commonBase";
import { PRODUCTCATEGORYSELECTION } from "../pomPages/productCategorySelection";
import { parse } from "csv-parse/sync";
import { COMPARINGPRODUCTS } from "../pomPages/comparingProduct";

let page: Page;
let signInPage: SIGNINPAGE;
let commonBase: COMMONBASE;
let productCategorySelection: PRODUCTCATEGORYSELECTION;
let comparingProducts: COMPARINGPRODUCTS;

let url: string = "https://magento.softwaretestingboard.com/";

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  signInPage = new SIGNINPAGE(page);
  commonBase = new COMMONBASE(page);
  productCategorySelection = new PRODUCTCATEGORYSELECTION(page);
  comparingProducts = new COMPARINGPRODUCTS(page);
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
csvCount = signinrecords.length;2
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
        await productCategorySelection.HoveringOnMenDropDown();
        await productCategorySelection.HoveringOnTopsDropDown();
        await productCategorySelection.SelectiongHoodiesOption();
      });

      await test.step("Selecting the Product using the Filters ", async () => {
        await comparingProducts.SelectingSizeFilter();
        await comparingProducts.SelectingColorFilter();
        await comparingProducts.SelectingPatternFilter();
      });
    });
  }
});

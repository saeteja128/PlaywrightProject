import { test } from "@playwright/test";
import { Page } from "playwright";
import { FILTER_FILE_CONTENT, CATEGORY_FILE_CONTENT, ADDCART_FILE_CONTENT, SIGNIN_FILE_CONTENT } from "../pom-pages/commonBase";
import { Review } from "../pom-pages/review_Payments";
import { ComparingProducts, FILTER_COLUMNS } from "../pom-pages/selectingFilterOptions";
import { ShippingMethod } from "../pom-pages/shippingMethod";
import { SignInPage, SIGNIN_COLUMNS } from "../pom-pages/signIn";
import { ViewingCart } from "../pom-pages/viewingCart";
import { ProductCategorySelection, CATEGORY_COLUMNS } from "../pom-pages/productCategorySelection";
import { AddingToCart, ADDCART_COLUMNS } from "../pom-pages/addingToCart";
import { parse } from "csv-parse/sync";
import CommonBase from "../pom-pages/commonBase";

let page: Page;
let signInPage: SignInPage;
let commonBase: CommonBase;
let productCategorySelection: ProductCategorySelection;
let comparingProducts: ComparingProducts;
let addingToCart: AddingToCart;
let viewingCart: ViewingCart;
let shippingMethod: ShippingMethod;
let review: Review;

let url: string = "https://magento.softwaretestingboard.com/";

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  signInPage = new SignInPage(page);
  commonBase = new CommonBase(page);
  productCategorySelection = new ProductCategorySelection(page);
  comparingProducts = new ComparingProducts(page);
  addingToCart = new AddingToCart(page);
  viewingCart = new ViewingCart(page);
  shippingMethod = new ShippingMethod(page);
  review = new Review(page);
});

test.use({
  viewport: { width: 1536, height: 776 },
  launchOptions: {
    slowMo: 300, //This option will sets the execution speed of the test.
  },
});

const SIGN_IN_RECORDS: any = parse(SIGNIN_FILE_CONTENT, {
  delimiter: ",",
  columns: SIGNIN_COLUMNS,
  fromLine: 2,
  skip_empty_lines: true,
});

let signInCsvCount: number;
signInCsvCount = SIGN_IN_RECORDS.length;
console.log("Records of Sign In CSV File", SIGN_IN_RECORDS);

const FILTER_RECORDS: any = parse(FILTER_FILE_CONTENT, {
  delimiter: ",",
  columns: FILTER_COLUMNS,
  fromLine: 2,
  skip_empty_lines: true,
});

let Filter_csvCount: number;
Filter_csvCount = FILTER_RECORDS.length;
console.log("Records of Selected Filters CSV File", FILTER_RECORDS);

const CATEGORY_RECORDS: any = parse(CATEGORY_FILE_CONTENT, {
  delimiter: ",",
  columns: CATEGORY_COLUMNS,
  fromLine: 2,
  skip_empty_lines: true,
});
console.log("Records of Selected Filters CSV File", CATEGORY_RECORDS);

const ADD_CART_RECORDS: any = parse(ADDCART_FILE_CONTENT, {
  delimiter: ",",
  columns: ADDCART_COLUMNS,
  fromLine: 2,
  skip_empty_lines: true,
});
console.log("Records of Selected Filters CSV File", ADD_CART_RECORDS);

test.describe("Performing the End to End TC of an e-Commerce Website", () => {
  test.setTimeout(900000);
  for (let i = 0; i < signInCsvCount; i++) {
    test(`Existing User Sign In/New User Account Creation ${i}`, async () => {
      
      await test.step("Open application & navigating to Website", async () => {
        await commonBase.navigate(url);
      });

      await test.step("User Sign In/Sign Up Step based on the CSV input", async () => {
        await signInPage.SignIn_SignUp(SIGN_IN_RECORDS[i]);
      });

      await test.step("Navigating to the Product Category Page ", async () => {
        await productCategorySelection.HoveringOnGenderDropDown(
          CATEGORY_RECORDS[i].gender
        );
        await productCategorySelection.HoveringApparelDropDown(
          CATEGORY_RECORDS[i].gender,
          CATEGORY_RECORDS[i].apparel_type
        );
        await productCategorySelection.SelectingProductOption(
          CATEGORY_RECORDS[i].gender,
          CATEGORY_RECORDS[i].product_type
        );
      });

      for (let j = 0; j < Filter_csvCount; j++) {
        await test.step("Selecting the Product using the Filters ", async () => {
          await comparingProducts.SelectingFilterType(
            FILTER_RECORDS[j].filter_type,
            FILTER_RECORDS[j].filter_content
          );
        });
      }

      await test.step("Selecting the Product using the Filters and Adding it to the Cart ", async () => {
        await addingToCart.AddingProductToCart(
          ADD_CART_RECORDS[i],
          CATEGORY_RECORDS[i]
        );
      });
      
      await test.step("Viewing and Validating the Product which is added to the Cart", async () => {
        await viewingCart.NavigationgToCartPage();
        for (let k = 0; k < Filter_csvCount; k++) {
          await viewingCart.ValidatingFilterOfCartProduct(
            FILTER_RECORDS[k],
            FILTER_RECORDS[k].filter_type,
            FILTER_RECORDS[k].filter_content
          );
        }
        await viewingCart.clickingOnProceedToCheckoutButton();
      });

      await test.step("Selecting the Shipping Method and navigating to Review & Payments Page ", async () => {
        await shippingMethod.selectingShippingRadioButton();
        await shippingMethod.clickingNextButton();
      });

      await test.step("Clicking on Place Order CTA Button", async () => {
        await review.clickingPlaceOrderCTAButton();
        await review.clickingOnSignOutButton();
      });
    });
  }
});
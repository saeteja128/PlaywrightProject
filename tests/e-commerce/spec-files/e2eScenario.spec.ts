import { test } from "@playwright/test";
import { Page } from "playwright";
import { Signin_fileContent, Filter_fileContent, Category_fileContent, addCart_fileContent } from "../pom-pages/commonBase";
import { Review } from "../pom-pages/review_Payments";
import { ComparingProducts, filterColumns } from "../pom-pages/selectingFilterOptions";
import { ShippingMethod } from "../pom-pages/shippingMethod";
import { SignInPage, signincolumns } from "../pom-pages/signIn";
import { ViewingCart } from "../pom-pages/viewingCart";
import { ProductCategorySelection, categoryColumns } from "../pom-pages/productCategorySelection";
import { AddingToCart, addCartColumns } from "../pom-pages/addingToCart";
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

const signInrecords: any = parse(Signin_fileContent, {
  delimiter: ",",
  columns: signincolumns,
  fromLine: 2,
  skip_empty_lines: true,
});

let Signin_csvCount: number;
Signin_csvCount = signInrecords.length;
console.log("Records of Sign In CSV File", signInrecords);

const filterRecords: any = parse(Filter_fileContent, {
  delimiter: ",",
  columns: filterColumns,
  fromLine: 2,
  skip_empty_lines: true,
});

let Filter_csvCount: number;
Filter_csvCount = filterRecords.length;
console.log("Records of Selected Filters CSV File", filterRecords);

const categoryRecords: any = parse(Category_fileContent, {
  delimiter: ",",
  columns: categoryColumns,
  fromLine: 2,
  skip_empty_lines: true,
});
console.log("Records of Selected Filters CSV File", categoryRecords);

const addCartRecords: any = parse(addCart_fileContent, {
  delimiter: ",",
  columns: addCartColumns,
  fromLine: 2,
  skip_empty_lines: true,
});
console.log("Records of Selected Filters CSV File", addCartRecords);

test.describe("Performing the End to End TC of an e-Commerce Website", () => {
  test.setTimeout(900000);
  for (let i = 0; i < Signin_csvCount; i++) {
    test(`Existing User Sign In/New User Account Creation ${i}`, async () => {
      
      await test.step("Open application & navigating to Website", async () => {
        await commonBase.navigate(url);
      });

      await test.step("User Sign In/Sign Up Step based on the CSV input", async () => {
        await signInPage.SignIn_SignUp(signInrecords[i]);
      });

      await test.step("Navigating to the Product Category Page ", async () => {
        await productCategorySelection.HoveringOnGenderDropDown(
          categoryRecords[i].gender
        );
        await productCategorySelection.HoveringApparelDropDown(
          categoryRecords[i].gender,
          categoryRecords[i].apparel_type
        );
        await productCategorySelection.SelectingProductOption(
          categoryRecords[i].gender,
          categoryRecords[i].product_type
        );
      });

      for (let j = 0; j < Filter_csvCount; j++) {
        await test.step("Selecting the Product using the Filters ", async () => {
          await comparingProducts.SelectingFilterType(
            filterRecords[j].filter_type,
            filterRecords[j].filter_content
          );
        });
      }

      await test.step("Selecting the Product using the Filters and Adding it to the Cart ", async () => {
        await addingToCart.AddingProductToCart(
          addCartRecords[i],
          categoryRecords[i]
        );
      });
      
      await test.step("Viewing and Validating the Product which is added to the Cart", async () => {
        await viewingCart.NavigationgToCartPage();
        for (let k = 0; k < Filter_csvCount; k++) {
          await viewingCart.ValidatingFilterOfCartProduct(
            filterRecords[k],
            filterRecords[k].filter_type,
            filterRecords[k].filter_content
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
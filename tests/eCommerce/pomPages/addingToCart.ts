import { Page } from "@playwright/test";
import COMMONBASE, { findHighestValue } from "./commonBase";
import {
  removeDigitsAfterDecimalFromArray,
  findLowestValue,
} from "./commonBase";
import { categoryRecords } from "./productCategorySelection";

interface addCartRecords {
  product_price: any;
}

export const addCartColumns = ["product_price"];

let productLocatorValue: string;
let resultArray: string[];
let PriceArray: any[];
let locatorCountDiv4: number;
let locatorCountDiv3: number;

export let LowestProductValue: any;
export let HighestProductValue: any;

export class ADDINGTOCART extends COMMONBASE {
  constructor(page: Page) {
    super(page);
  }

  GettingPriceOfProducts = () =>
    this.page.locator(
      "//div[@class='price-box price-final_price']/span/span/span/span"
    );

  ProductPrice = () =>
    this.page.locator(
      "//div[@class='price-box price-final_price']/span/span/span/span[contains(text(),'" +
        productLocatorValue +
        "')]"
    );

  ProductPriceIndex = () =>
    this.page.locator(
      "(//div[@class='price-box price-final_price']/span/span/span/span[contains(text(),'" +
        productLocatorValue +
        "')])[1]"
    );

  AddToCartDIV4CTAButton = () =>
    this.page.locator(
      "//span[contains(text(),'" +
        productLocatorValue +
        "')]//ancestor::ol/li/div/div/div/span/span/span[@data-price-amount='" +
        productLocatorValue +
        "']//ancestor::div/div/div[4]/div/div/form/button[@title='Add to Cart']"
    );

  AddToCartDIV3CTAButton = () =>
    this.page.locator(
      "//span[contains(text(),'" +
        productLocatorValue +
        "')]//ancestor::ol/li/div/div/div/span/span/span[@data-price-amount='" +
        productLocatorValue +
        "']//ancestor::div/div/div[3]/div/div/form/button[@title='Add to Cart']"
    );

  AddToCartDIV4IndexCTAButton = () =>
    this.page.locator(
      "(//span[contains(text(),'" +
        productLocatorValue +
        "')]//ancestor::ol/li/div/div/div/span/span/span[@data-price-amount='" +
        productLocatorValue +
        "']//ancestor::div/div/div[4]/div/div/form/button[@title='Add to Cart'])[1]"
    );

  AddToCartDIV3IndexCTAButton = () =>
    this.page.locator(
      "(//span[contains(text(),'" +
        productLocatorValue +
        "')]//ancestor::ol/li/div/div/div/span/span/span[@data-price-amount='" +
        productLocatorValue +
        "']//ancestor::div/div/div[3]/div/div/form/button[@title='Add to Cart'])[1]"
    );

  async AddingProductToCart(
    { product_price }: addCartRecords,
    { gender, apparel_type, product_type }: categoryRecords
  ): Promise<any> {
    resultArray = await this.GettingPriceOfProducts().allTextContents();
    PriceArray = removeDigitsAfterDecimalFromArray(resultArray);

    if (product_price.trim().toLowerCase() == "lowest") {
      LowestProductValue = findLowestValue(PriceArray);
      console.log(`The Lowest value of the product: `, LowestProductValue);

      productLocatorValue = LowestProductValue;

      locatorCountDiv4 = await this.AddToCartDIV4CTAButton().count();
      console.log("No of Locators available Div4: ", locatorCountDiv4);

      locatorCountDiv3 = await this.AddToCartDIV3CTAButton().count();
      console.log("No of Locators available Div3: ", locatorCountDiv3);

      if (
        (gender == "Men" && apparel_type == "Tops" && product_type == "Jackets") ||
        (gender == "Women" && apparel_type == "Tops" && product_type == "Jackets") ||
        (gender == "Men" || "Women" && apparel_type == "Tops" && product_type == "Tees") ||
        (gender == "Women" && apparel_type == "Bottoms" && product_type == "Shorts") ||
        (gender == "Women" && apparel_type == "Bottoms" && product_type == "Pants")
      ) {
        if (locatorCountDiv4 == 1) {
          await this.ProductPrice().hover();
          await this.AddToCartDIV4CTAButton().click();
        } else {
          await this.ProductPriceIndex().hover();
          await this.AddToCartDIV4IndexCTAButton().click();
        }
      } else {
        if (locatorCountDiv3 == 1) {
          await this.ProductPrice().hover();
          await this.AddToCartDIV3CTAButton().click();
        } else {
          await this.ProductPriceIndex().hover();
          await this.AddToCartDIV3IndexCTAButton().click();
        }
      }
      await this.loadState();
      console.log(
        `Product with lowest price value ${LowestProductValue} added to the cart successfully`
      );
      return LowestProductValue;
    } else if (product_price.trim().toLowerCase() == "highest") {
      HighestProductValue = findHighestValue(PriceArray);
      console.log(`The Highest value of the product: `, HighestProductValue);

      productLocatorValue = HighestProductValue;

      locatorCountDiv4 = await this.AddToCartDIV4CTAButton().count();
      console.log("No of Locators available Div4: ", locatorCountDiv4);

      locatorCountDiv3 = await this.AddToCartDIV3CTAButton().count();
      console.log("No of Locators available Div3: ", locatorCountDiv3);

      if (
        (gender == "Men" && apparel_type == "Tops" && product_type == "Jackets") ||
        (gender == "Women" && apparel_type == "Tops" && product_type == "Jackets") ||
        (gender == "Men" || "Women" && apparel_type == "Tops" && product_type == "Tees") ||
        (gender == "Women" && apparel_type == "Bottoms" && product_type == "Shorts") ||
        (gender == "Women" && apparel_type == "Bottoms" && product_type == "Pants")
      ) {
        if (locatorCountDiv4 == 1) {
          await this.ProductPrice().hover();
          await this.AddToCartDIV4CTAButton().click();
        } else {
          await this.ProductPriceIndex().hover();
          await this.AddToCartDIV4IndexCTAButton().click();
        }
      } else {
        if (locatorCountDiv3 == 1) {
          await this.ProductPrice().hover();
          await this.AddToCartDIV3CTAButton().click();
        } else {
          await this.ProductPriceIndex().hover();
          await this.AddToCartDIV3IndexCTAButton().click();
        }
      }
      await this.loadState();
      console.log(
        `Product with highest price value ${HighestProductValue} added to the cart successfully`
      );
      return HighestProductValue;
    } else {
      console.log("Value in CSV file: ", product_price);
      productLocatorValue = product_price;

      locatorCountDiv4 = await this.AddToCartDIV4CTAButton().count();
      console.log("No of Locators available Div4: ", locatorCountDiv4);

      locatorCountDiv3 = await this.AddToCartDIV3CTAButton().count();
      console.log("No of Locators available Div3: ", locatorCountDiv3);

      if (
        (gender == "Men" && apparel_type == "Tops" && product_type == "Jackets") ||
        (gender == "Women" && apparel_type == "Tops" && product_type == "Jackets") ||
        (gender == "Men" || "Women" && apparel_type == "Tops" && product_type == "Tees") ||
        (gender == "Women" && apparel_type == "Bottoms" && product_type == "Shorts") || 
        (gender == "Women" && apparel_type == "Bottoms" && product_type == "Pants")) {
        if (locatorCountDiv4 == 1) {
          await this.ProductPrice().hover();
          await this.AddToCartDIV4CTAButton().click();
        } else {
          await this.ProductPriceIndex().hover();
          await this.AddToCartDIV4IndexCTAButton().click();
        }
      } else {
        if (locatorCountDiv3 == 1) {
          await this.ProductPrice().hover();
          await this.AddToCartDIV3CTAButton().click();
        } else {
          await this.ProductPriceIndex().hover();
          await this.AddToCartDIV3IndexCTAButton().click();
        }
      }
      await this.loadState();
      console.log(
        `Product value ${product_price} provided in CSV added to the cart successfully`
      );
      return product_price;
    }
  }
}

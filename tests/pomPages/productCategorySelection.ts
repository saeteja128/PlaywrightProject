import { Page, expect } from "@playwright/test";
import COMMONBASE from "./commonBase";

export interface categoryRecords {
  gender: string;
  apparel_type: string;
  product_type: string;
}

export const categoryColumns = ["gender", "apparel_type", "product_type"];

let GenderType: string;
let ApparelType: string;
let ProductType: string;

export class PRODUCTCATEGORYSELECTION extends COMMONBASE {
  constructor(page: Page) {
    super(page);
  }

  GenderDropDown = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/a/span[contains(text(),'" +
        GenderType +
        "')]"
    );

  ApparelDropDownWomen = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/ul/li/a[contains(@href,'-women')]/span[contains(text(),'" +
        ApparelType +
        "')]"
    );

  ApparelDropDownMen = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/ul/li/a[contains(@href,'-men')]/span[contains(text(),'" +
        ApparelType +
        "')]"
    );

  ProductTypeMenButton = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/ul/li/ul/li/a[contains(@href,'-men')]/span[contains(text(),'" +
        ProductType +
        "')]"
    );

  ProductTypeWomenButton = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/ul/li/ul/li/a[contains(@href,'-women')]/span[contains(text(),'" +
        ProductType +
        "')]"
    );

  async HoveringOnGenderDropDown(GenderValue: string): Promise<void> {
    GenderType = GenderValue;
    await this.loadStateDomContent();
    await this.GenderDropDown().hover();
    console.log(`Gender Type "${GenderType}" expanded in Header`);
  }

  async HoveringApparelDropDown(
    GenderValue: string,
    ApparelValue: string
  ): Promise<void> {
    GenderType = GenderValue;
    ApparelType = ApparelValue;
    switch (GenderType.trim().toLowerCase()) {
      case "men":
        await this.ApparelDropDownMen().hover();
        console.log(
          `Apparel Type "${ApparelType}" expanded under "${GenderType} Category" `
        );
        break;

      case "women":
        await this.ApparelDropDownWomen().hover();
        console.log(
          `Apparel Type "${ApparelType}" expanded under "${GenderType} Category" `
        );
        break;

      default:
        console.log("Wrong Input provided in the CSV file");
    }
  }

  async SelectingProductOption(
    GenderValue: string,
    ProductValue: string
  ): Promise<void> {
    GenderType = GenderValue;
    ProductType = ProductValue;
    switch (GenderType.trim().toLowerCase()) {
      case "men":
        console.log(GenderType.trim().toLowerCase());
        await this.ProductTypeMenButton().click();
        console.log(
          `Product Type "${ProductType}" expanded under "${GenderType} Category" `
        );
        break;

      case "women":
        await this.ProductTypeWomenButton().click();
        console.log(
          `Product Type "${ProductType}" expanded under "${GenderType} Category" `
        );
        break;

      default:
        console.log("Wrong Input provided in the CSV file");
    }
  }
}

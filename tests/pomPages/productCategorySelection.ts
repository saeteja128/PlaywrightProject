import { Page, expect } from "@playwright/test";
import COMMONBASE from "./commonBase";

interface categoryRecords {
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
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/ul/li/a[contains(@href,'women')]/span[contains(text(),'" +
        ApparelType +
        "')]"
    );

  ApparelDropDownMen = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/ul/li/a[contains(@href,'men')]/span[contains(text(),'" +
        ApparelType +
        "')]"
    );

  ProductTypeButton = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/ul/li/ul/li/a/span[contains(text(),'" +
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
    { gender }: categoryRecords,
    ApparelValue: string
  ): Promise<void> {
    ApparelType = ApparelValue;
    if (gender.trim().toLowerCase() == "men") {
      await this.ApparelDropDownMen().hover();
      console.log(
        `Apparel Type "${ApparelType}" expanded under "${gender} Category" `
      );
    } else if (gender.trim().toLowerCase() == "women") {
      await this.ApparelDropDownWomen().hover();
      console.log(
        `Apparel Type "${ApparelType}" expanded under "${gender} Category" `
      );
    } else {
      console.log("Wrong Input provided in the CSV file");
    }
  }

  async SelectingProductOption(ProductValue: string): Promise<void> {
    ProductType = ProductValue;
    await this.ProductTypeButton().click();
    console.log(`Product Type "${ProductType}" is selected`);
  }
}

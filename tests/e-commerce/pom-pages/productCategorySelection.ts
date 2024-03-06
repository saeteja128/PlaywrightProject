import { Page } from "playwright";
import CommonBase from "./commonBase";

export interface Category_Records {
  gender: string;
  apparel_type: string;
  product_type: string;
}

export const CATEGORY_COLUMNS = ["gender", "apparel_type", "product_type"];

let genderType: string;
let apparelType: string;
let productType: string;

export class ProductCategorySelection extends CommonBase {
  constructor(page: Page) {
    super(page);
  }

  GenderDropDown = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/a/span[contains(text(),'" +
        genderType +
        "')]"
    );

  ApparelDropDownWomen = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/ul/li/a[contains(@href,'-women')]/span[contains(text(),'" +
        apparelType +
        "')]"
    );

  ApparelDropDownMen = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/ul/li/a[contains(@href,'-men')]/span[contains(text(),'" +
        apparelType +
        "')]"
    );

  ProductTypeMenButton = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/ul/li/ul/li/a[contains(@href,'-men')]/span[contains(text(),'" +
        productType +
        "')]"
    );

  ProductTypeWomenButton = () =>
    this.page.locator(
      "//div[@class='section-item-content nav-sections-item-content']/nav/ul/li/ul/li/ul/li/a[contains(@href,'-women')]/span[contains(text(),'" +
        productType +
        "')]"
    );

  async HoveringOnGenderDropDown(GenderValue: string): Promise<void> {
    genderType = GenderValue;
    await this.loadStateDomContent();
    await this.GenderDropDown().hover();
    console.log(`Gender Type "${genderType}" expanded in Header`);
  }

  async HoveringApparelDropDown(
    GenderValue: string,
    ApparelValue: string
  ): Promise<void> {
    genderType = GenderValue;
    apparelType = ApparelValue;
    switch (genderType.trim().toLowerCase()) {
      case "men":
        await this.ApparelDropDownMen().hover();
        console.log(
          `Apparel Type "${apparelType}" expanded under "${genderType} Category" `
        );
        break;

      case "women":
        await this.ApparelDropDownWomen().hover();
        console.log(
          `Apparel Type "${apparelType}" expanded under "${genderType} Category" `
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
    genderType = GenderValue;
    productType = ProductValue;
    switch (genderType.trim().toLowerCase()) {
      case "men":
        console.log(genderType.trim().toLowerCase());
        await this.ProductTypeMenButton().click();
        console.log(
          `Product Type "${productType}" expanded under "${genderType} Category" `
        );
        break;

      case "women":
        await this.ProductTypeWomenButton().click();
        console.log(
          `Product Type "${productType}" expanded under "${genderType} Category" `
        );
        break;

      default:
        console.log("Wrong Input provided in the CSV file");
    }
  }
}

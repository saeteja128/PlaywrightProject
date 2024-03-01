import { Page } from "@playwright/test";
import COMMONBASE, { findLowestValue, removeDigitsAfterDecimalFromArray } from "./commonBase";

export interface filterRecords {
  filter_type: string;
  filter_content: string;
}

export const filterColumns = ["filter_type", "filter_content"];

let FilterType: string;
let FilterTypeOption: string;

export class COMPARINGPRODUCTS extends COMMONBASE {
  constructor(page: Page) {
    super(page);
  }

  SelectFilterType = () =>
    this.page.locator(
      "//div[@class='filter-options']/div/div[@class='filter-options-title'][contains(text(), '" +
        FilterType +
        "')]"
    );

  SelectColorFilterOption = () =>
    this.page.locator(
      "//div[@class='swatch-attribute swatch-layered color']/div/a/div[@option-label='" +
        FilterTypeOption +
        "']"
    );

  SelectSizeFilterOption = () =>
    this.page.locator(
      "//div[@class='swatch-attribute swatch-layered size']/div/a/div[text()='" +
        FilterTypeOption +
        "']"
    );

  SelectPatternFilterOption = () =>
    this.page.locator(
      "//div[@class='filter-options-content']/ol/li/a[contains(text(),'" +
        FilterTypeOption +
        "')]"
    );

  async SelectingFilterType(
    FilterValue: string,
    FilterOption: string
  ): Promise<void> {
    FilterType = FilterValue;
    FilterTypeOption = FilterOption;
    switch (FilterType.trim().toLowerCase()) {
      case "size":
        await this.loadState();
        await this.SelectFilterType().click();
        console.log(`Selected the Filter "${FilterType}" successfully`);
        await this.loadState();
        await this.SelectSizeFilterOption().click();
        console.log(
          `Selected the option "${FilterTypeOption}" in Filter "${FilterType}" successfully`
        );
        break;

      case "color":
        await this.loadState();
        await this.SelectFilterType().click();
        console.log(`Selected the Size Filter "${FilterType}" successfully`);
        await this.loadState();
        await this.SelectColorFilterOption().click();
        console.log(
          `Selected the option "${FilterTypeOption}" in Filter "${FilterType}" successfully`
        );
        break;

      case "pattern":
        await this.loadState();
        await this.SelectFilterType().click();
        console.log(`Selected the Size Filter "${FilterType}" successfully`);
        await this.loadState();
        await this.SelectPatternFilterOption().click();
        console.log(
          `Selected the option "${FilterTypeOption}" in Filter "${FilterType}" successfully`
        );
        break;

      default:
        console.log("Filter Type Not Provided");
    }
  }
}

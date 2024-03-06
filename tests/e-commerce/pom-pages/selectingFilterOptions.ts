import { Page } from "playwright";
import CommonBase, {findLowestValue, removeDigitsAfterDecimalFromArray} from "./commonBase";

export interface filterRecords {
  filter_type: string;
  filter_content: string;
}

export const FILTER_COLUMNS = ["filter_type", "filter_content"];

let filterType: string;
let filterTypeOption: string;

export class ComparingProducts extends CommonBase {
  constructor(page: Page) {
    super(page);
  }

  SelectFilterType = () =>
    this.page.locator(
      "//div[@class='filter-options']/div/div[@class='filter-options-title'][contains(text(), '" +
        filterType +
        "')]"
    );

  SelectColorFilterOption = () =>
    this.page.locator(
      "//div[@class='swatch-attribute swatch-layered color']/div/a/div[@option-label='" +
        filterTypeOption +
        "']"
    );

  SelectSizeFilterOption = () =>
    this.page.locator(
      "//div[@class='swatch-attribute swatch-layered size']/div/a/div[text()='" +
        filterTypeOption +
        "']"
    );

  SelectPatternFilterOption = () =>
    this.page.locator(
      "//div[@class='filter-options-content']/ol/li/a[contains(text(),'" +
        filterTypeOption +
        "')]"
    );

  async SelectingFilterType(
    FilterValue: string,
    FilterOption: string
  ): Promise<void> {
    filterType = FilterValue;
    filterTypeOption = FilterOption;
    switch (filterType.trim().toLowerCase()) {
      case "size":
        await this.loadState();
        await this.SelectFilterType().click();
        console.log(`Selected the Filter "${filterType}" successfully`);
        await this.loadState();
        await this.SelectSizeFilterOption().click();
        console.log(
          `Selected the option "${filterTypeOption}" in Filter "${filterType}" successfully`
        );
        break;

      case "color":
        await this.loadState();
        await this.SelectFilterType().click();
        console.log(`Selected the Size Filter "${filterType}" successfully`);
        await this.loadState();
        await this.SelectColorFilterOption().click();
        console.log(
          `Selected the option "${filterTypeOption}" in Filter "${filterType}" successfully`
        );
        break;

      case "pattern":
        await this.loadState();
        await this.SelectFilterType().click();
        console.log(`Selected the Size Filter "${filterType}" successfully`);
        await this.loadState();
        await this.SelectPatternFilterOption().click();
        console.log(
          `Selected the option "${filterTypeOption}" in Filter "${filterType}" successfully`
        );
        break;

      default:
        console.log("Filter Type Not Provided");
    }
  }
}

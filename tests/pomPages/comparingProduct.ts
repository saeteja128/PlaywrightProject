import { Page } from "@playwright/test";
import COMMONBASE from "./commonBase";

export class COMPARINGPRODUCTS extends COMMONBASE {
  constructor(page: Page) {
    super(page);
  }
  SizeFilterDropDown = () =>
    this.page.locator(
      "//div[@class='filter-options-title'][contains(text(), 'Size')]"
    );

  SizeSelectButton = () =>
    this.page.locator(
      "//div[@class='swatch-attribute swatch-layered size']/div/a/div[@option-label='S']"
    );

  ColorFilterDropDown = () =>
    this.page.locator(
      "//div[@class='filter-options-title'][contains(text(), 'Color')]"
    );

  ColorSelectButton = () =>
    this.page.locator(
      "//div[@class='swatch-attribute swatch-layered color']/div/a/div[@option-label='White']"
    );

  PatternFilterDropDown = () =>
    this.page.locator(
      "//div[@class='filter-options-title'][contains(text(), 'Pattern')]"
    );

  PatternSelectButton = () =>
    this.page.locator(
      "//div[@class='filter-options-content']/ol/li/a[@href='https://magento.softwaretestingboard.com/men/tops-men/hoodies-and-sweatshirts-men.html?color=59&pattern=196&size=167'][contains(text(),'Solid')]"
    );

  async SelectingSizeFilter(): Promise<void> {
    await this.loadState();
    await this.SizeFilterDropDown().click();
    await this.loadState();
    await this.SizeSelectButton().click();
    console.log("Selected the Size Filter successfully");
  }

  async SelectingColorFilter(): Promise<void> {
    await this.loadStateDomContent();
    await this.ColorFilterDropDown().click();
    await this.loadState();
    await this.ColorSelectButton().click();
    console.log("Selected the Color Filter successfully");
  }

  async SelectingPatternFilter(): Promise<void> {
    await this.loadState();
    await this.PatternFilterDropDown().click();
    await this.loadState();
    await this.PatternSelectButton().click();
    await this.loadState();
    await this.page.waitForTimeout(6000);
    console.log("Selected the Pattern Filter successfully");
  }
}

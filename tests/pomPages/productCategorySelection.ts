import { Page, expect } from "@playwright/test";
import COMMONBASE from "./commonBase";

export class PRODUCTCATEGORYSELECTION extends COMMONBASE {
  constructor(page: Page) {
    super(page);
  }

  MenDropDown = () =>
    this.page.locator(
      "//a[@href='https://magento.softwaretestingboard.com/men.html']/span[contains(text(), 'Men')]"
    );

  TopsDropDown = () =>
    this.page.locator(
      "//a[@href='https://magento.softwaretestingboard.com/men/tops-men.html']/span[contains(text(), 'Tops')]"
    );

  HoodiesOption = () =>
    this.page.locator(
      "//a[@href='https://magento.softwaretestingboard.com/men/tops-men/hoodies-and-sweatshirts-men.html']/span[contains(text(), 'Hoodies & Sweatshirts')]"
    );

  async HoveringOnMenDropDown(): Promise<void> {
    await this.loadStateDomContent();
    await this.MenDropDown().hover();
    console.log("Hovered on the Men Drop down menu option successfully");
  }

  async HoveringOnTopsDropDown(): Promise<void> {
    await this.TopsDropDown().hover();
    console.log("Hovered on the Tops Drop down menu option successfully");
  }

  async SelectiongHoodiesOption(): Promise<void> {
    await this.HoodiesOption().click();
    await this.loadStateDomContent();
    console.log("Selected the Hoodies & Sweatshirts option successfully");
  }
}

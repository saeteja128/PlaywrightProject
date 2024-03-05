import { Page } from "playwright";
import CommonBase from "./commonBase";

export class ShippingMethod extends CommonBase {
  constructor(page: Page) {
    super(page);
  }

  shippingMethodsText = () => this.page.locator("//div[contains(text(),'Shipping Methods')]");

  shippingMethodRadioButton = () =>
    this.page.locator("//input[@name='ko_unique_1']");

  shippingMethodNextBUtton = () =>
    this.page.locator("//button[@class='button action continue primary']");

    loaderIcon = () => this.page.locator("//div[@data-role='loader']");


  async selectingShippingRadioButton() {
    await this.page.waitForTimeout(3000);
    await this.shippingMethodRadioButton().click();
    console.log("Selected the Shipping Method Radio button successfully");
  }

  async clickingNextButton() {
    await this.page.waitForTimeout(1000);
    await this.shippingMethodNextBUtton().click();
    console.log("Clicked the Shipping Method Next CTA button successfully");
  }
}

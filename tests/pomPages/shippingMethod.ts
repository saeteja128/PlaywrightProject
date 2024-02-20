import { Page, expect } from "@playwright/test";
import COMMONBASE from "./commonBase";

export class SHIPPINGMETHOD extends COMMONBASE {
  constructor(page: Page) {
    super(page);
  }

  shippingMethodsText = () => this.page.locator("//div[contains(text(),'Shipping Methods')]");

  shippingMethodRadioButton = () =>
    this.page.locator("//input[@name='ko_unique_1']");

  shippingMethodNextBUtton = () =>
    this.page.locator("//button[@class='button action continue primary']");


  async selectingShippingRadioButton() {
    await this.shippingMethodRadioButton().click();
    console.log("Selected the Shipping Method Radio button successfully");
  }

  async clickingNextButton() {
    await this.shippingMethodNextBUtton().click();
    console.log("Clicked the Shipping Method Next CTA button successfully");
  }
}

import { Page } from "@playwright/test";
import COMMONBASE from "./commonBase";

export class REVIEW extends COMMONBASE {
  constructor(page: Page) {
    super(page);
  }

  placeOrderCTAButton = () =>
    this.page.locator("//button[@title='Place Order']");

  profileDropDown = () =>
    this.page.locator(
      "//div[@class='panel header']//span[contains(text(),'Change')]"
    );

  signOutButton = () =>
    this.page.locator(
      "//div[@aria-hidden='false']//a[normalize-space()='Sign Out']"
    );

  async clickingPlaceOrderCTAButton() {
    await this.loadStateDomContent();
    await this.placeOrderCTAButton().click();
    console.log("Successfully navigated to Thank you Page");
  }

  async clickingOnSignOutButton() {
    await this.loadStateDomContent();
    await this.profileDropDown().click();
    await this.signOutButton().click();
    console.log("Signed Out from the Account Successfully");
  }
}

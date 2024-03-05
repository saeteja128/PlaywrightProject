import { Page } from "playwright";
import COMMONBASE from "./commonBase";
import { filterRecords } from "./selectingFilterOptions";
import { expect } from "@playwright/test";

let FilterType: string;
let FilterTypeOption: string;

export class VIEWINGCART extends COMMONBASE {
  constructor(page: Page) {
    super(page);
  }

  cartIcon = () => this.page.locator("//div[@class='minicart-wrapper']/a");
  deleteItemIcon = () =>
    this.page.locator("//div[@class='secondary']/a[@title='Remove item']");
  cancelPopUpButton = () =>
    this.page.locator(
      "//footer[@class='modal-footer']/button/span[text()='Cancel']"
    );
  viewAndEditCartLink = () =>
    this.page.locator(
      "//div[@class='secondary']/a/span[text()='View and Edit Cart']"
    );
  filterInCartPage = () =>
    this.page.locator(
      "//dl[@class='item-options']/dt[text()='" + FilterType + "']"
    );
  filterValueInCartPage = () =>
    this.page.locator("//dd[contains(text(),'" + FilterTypeOption + "')]");

  colorInCartPage = () =>
    this.page.locator(
      "//dl[@class='item-options']//dt[contains(text(),'Color')]"
    );
  colorValueInCartPage = () =>
    this.page.locator("//dd[contains(text(),'Black')]");

  proceedToCheckoutButton = () =>
    this.page.locator("//button[@data-role='proceed-to-checkout']");

  profileDropDown = () =>
    this.page.locator(
      "//div[@class='panel header']//span[contains(text(),'Change')]"
    );

  signOutButton = () =>
    this.page.locator(
      "//div[@aria-hidden='false']//a[normalize-space()='Sign Out']"
    );


  async NavigationgToCartPage(): Promise<void> {
    await this.loadState();
    await this.cartIcon().click();
    await this.deleteItemIcon().click();
    await this.loadState();
    await this.cancelPopUpButton().click();
    await this.loadState();
    await this.viewAndEditCartLink().click();
  }

  async ValidatingFilterOfCartProduct(
    { filter_type, filter_content }: filterRecords,
    FilterValue: string,
    FilterOption: string
  ): Promise<void> {
    console.log("Filter Type:", filter_type);
    console.log("Filter Content:", filter_content);
    FilterType = FilterValue;
    FilterTypeOption = FilterOption;
    try {
      await expect.soft(await this.filterInCartPage()).toHaveText('filter_type');
      await expect
        .soft(await this.filterValueInCartPage())
        .toHaveText('filter_content');
      console.log(
        `Validated the Filter: ${filter_type} and Filter_Value: ${filter_content} successfully`
      );
    } catch (error) {
      console.log("The Assertion got failed, stopping the script from execution");
      await this.profileDropDown().click();
      await this.signOutButton().click();
      console.log("Signed Out from the Account Successfully");
    }
  }

  async clickingOnProceedToCheckoutButton() {
    await this.loadState();
    await this.proceedToCheckoutButton().click();
    console.log("Clicked the button Proceed to Checkout successfully");
  }
}

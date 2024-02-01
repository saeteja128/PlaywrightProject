import { Page, expect } from "@playwright/test";
import { expect as baseExpect } from '@playwright/test';
import COMMONBASE from "./commonBase";

export class PRODUCTSELECTION extends COMMONBASE {
  constructor(page: Page) {
    super(page);
  }

  MenDropDown = () =>
    this.page.locator(
      "//li[@class='level0 nav-3 category-item level-top parent ui-menu-item']/a/span[contains(text(),'Men')]"
    );

  TopsDropDown = () =>
    this.page.locator(
      "//a[@class='ui-corner-all']/span[contains(text(), 'Tops')]"
    );

    //TestCommit
    //TestCommit2
    //TestCommit3
    //TestCommit4
    //TestCommit5
    //TestCommit6
    //TestCommit7


  HoodiesOption = () =>
    this.page.locator(
      "//a[@id='ui-id-20']/span[contains(text(), 'Hoodies & Sweatshirts')]"
    );

  async HoveringOnMenDropDown(): Promise<void> {
    await this.loadStateDomContent();
    await this.MenDropDown().hover();
    console.log("Hovered on the Men Drop down menu option successfully");
  }

  async HoveringOnTopsDropDown(): Promise<void> {
    await this.page.waitForTimeout(500);
    await this.TopsDropDown().hover();
    await this.page.pause();
    console.log("Hovered on the Tops Drop down menu option successfully");
  }

  async SelectiongHoodiesOption(): Promise<void> {
    await this.HoodiesOption().click();
    await this.loadStateDomContent();
    console.log("Selected the Hoodies & Sweatshirts option successfully");
  }
}

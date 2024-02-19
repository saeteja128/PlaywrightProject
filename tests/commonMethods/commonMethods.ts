import path from "path";
import { Page } from "playwright";
import fs from "fs";

export default class COMMONMETHODS {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  fileUploadLink = () =>
    this.page.locator("//a[contains(text(),'Upload File Demo')]");
  uploadFileButton = () => this.page.locator("//input[@id='file']");

  async navigate(url: string): Promise<void> {
    await this.page.goto(`${url}`);
    await this.loadStateDomContent();
  }

  async loadStateDomContent(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async loadStateNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async loadState(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForLoadState("load");
  }

  async uploadFile(): Promise<void> {
    await this.fileUploadLink().click();
    await this.loadStateDomContent();

    const filepath = "tests/testData/SkodaSupercare.pdf";
    await this.uploadFileButton().setInputFiles(filepath);
    await this.page.waitForTimeout(2000);
    console.log("Uploaded the Text File successfully");
  }
}

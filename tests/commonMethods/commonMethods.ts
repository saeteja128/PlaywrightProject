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

  dragAndDropLink = () =>
    this.page.locator("//a[contains(text(),'Drag and Drop')]");

  sliderLink = () => this.page.locator("//a[contains(text(),'Drag & Drop Sliders')]");

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

    // await this.page.locator("//div[@class='zak-header-actions zak-header-actions--desktop']//a[@title='View your shopping cart']//*[name()='svg']//*[name()='path' and contains(@d,'M18.5 22c-')]").click();
    // //input[@id='input_1']
    // //input[@name='upload_1']
    // const filepath = "tests/testData/SkodaSupercare.pdf";


  }

  async dragAndDrop(): Promise<void> {
    await this.dragAndDropLink().click();
    await this.loadStateDomContent();

    await this.page.waitForSelector("//div[@id='draggable']");
    await this.page.waitForSelector("//div[@id='droppable']");

    const sourceElement = await this.page.$("//div[@id='draggable']");
    const targetElement = await this.page.$("//div[@id='droppable']");

    if (sourceElement && targetElement) {
      const sourceBoundingBox = await sourceElement.boundingBox();
      const targetBoundingBox = await targetElement.boundingBox();

      if (sourceBoundingBox && targetBoundingBox) {
        const dragStartX = sourceBoundingBox.x + sourceBoundingBox.width / 2;
        const dragStartY = sourceBoundingBox.y + sourceBoundingBox.height / 2;

        const dropTargetX = targetBoundingBox.x + targetBoundingBox.width / 2;
        const dropTargetY = targetBoundingBox.y + targetBoundingBox.height / 2;

        await this.page.mouse.move(dragStartX, dragStartY);
        await this.page.mouse.down();
        await this.page.mouse.move(dropTargetX, dropTargetY);
        await this.page.mouse.up();
        await this.page.waitForTimeout(2000);

        console.log("Element dragged and dropped successfully.");
      } else {
        console.error(
          "Failed to get bounding boxes for source or target elements."
        );
      }
    } else {
      console.error("Source or target element not found.");
    }
  }

  async sliderElement(): Promise<void> {
    await this.sliderLink().click();
    await this.loadStateDomContent();

    await this.page.waitForSelector("//div[@class='sp__range']/input");

    const sliderHandle = await this.page.$("//div[@class='sp__range']/input");

    if (sliderHandle) {
      // Get the bounding box of the slider handle
      const sliderBoundingBox = await sliderHandle.boundingBox();
      console.log("Value:", sliderBoundingBox);

      if (sliderBoundingBox) {
          // Calculate the middle of the slider handle
          const middleX = sliderBoundingBox.x + sliderBoundingBox.width / 2;
          const middleY = sliderBoundingBox.y + sliderBoundingBox.height / 2;

          // Move the mouse to the middle of the slider handle and click to start dragging
          await this.page.mouse.move(middleX, middleY);
          await this.page.mouse.down();

          // Move the mouse to the desired position (adjust the coordinates based on your scenario)
          await this.page.mouse.move(middleX - 50, middleY);

          // Release the mouse to complete the drag
          await this.page.mouse.up();

          console.log('Slider automated successfully.');
      } else {
          console.error('Failed to get bounding box for the slider handle.');
      }
  } else {
      console.error(`Slider handle element  not found.`);
  }
  }
}

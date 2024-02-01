import path from "path";
import { Page } from "playwright";
import { signincolumns } from "./signIn";
import fs from "fs";
import { parse } from "csv-parse/sync";

export default class COMMONBASE {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

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
}

//CSV File Path and Declaration for Sign In Screen

const root_dir = process.cwd();
console.log(root_dir);
export let fileSep = path.sep;
console.log(fileSep);
export const tessDataFolder: string =
  root_dir + fileSep + "tests" + fileSep + "testData_Csv";
console.log("Directory in Common Base: ", tessDataFolder);

export const signinData: string = tessDataFolder + fileSep + "luma_signin.csv";
console.log("Directory of CSV File: ", signinData);

export const csvFilePath = path.resolve(__dirname, signinData);
export const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

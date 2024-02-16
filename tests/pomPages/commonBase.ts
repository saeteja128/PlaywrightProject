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


//File Path related to Signin of the user based on the user input
export const signinData: string = tessDataFolder + fileSep + "luma_signin.csv";
export const Signin_csvFilePath = path.resolve(__dirname, signinData);
export const Signin_fileContent = fs.readFileSync(Signin_csvFilePath, { encoding: "utf-8" });


//File Path related to Filters Selection in the Respective Product Page
export const filterData: string = tessDataFolder + fileSep + "filter_selection1.csv";
export const Filter_csvFilePath = path.resolve(__dirname, filterData);
export const Filter_fileContent = fs.readFileSync(Filter_csvFilePath, { encoding: "utf-8" });


// //File Path related to Category Selection of the Product based on the user input
export const categoryData: string = tessDataFolder + fileSep + "product_category.csv";
export const Category_csvFilePath = path.resolve(__dirname, categoryData);
export const Category_fileContent = fs.readFileSync(Category_csvFilePath, { encoding: "utf-8" });


// //File Path related to Price Selection of the Product based on the user input
export const addCartData: string = tessDataFolder + fileSep + "add_cart.csv";
export const addCart_csvFilePath = path.resolve(__dirname,addCartData);
export const addCart_fileContent = fs.readFileSync(addCart_csvFilePath, {encoding: "utf-8"});


//Functions used 

export function removeDigitsAfterDecimalFromArray(inputArray: string[]): string[] {
  return inputArray.map((inputString) => {
    let stringWithoutDollar = inputString.replace("$", ""); //Remove Dollar Sign
    let stringWithoutDecimalDigits = stringWithoutDollar.replace(/\.\d+$/, ""); // Remove digits after decimal point
    return stringWithoutDecimalDigits;
  });
}

export function findLowestValue(numbers: number[]): number | undefined {
  return Math.min(...numbers);
}

export function findHighestValue(numbers: number[]): number | undefined {
  return Math.max(...numbers);
}

export function formatAsCurrency(value: number): string {
  const formattedValue = `$${value.toFixed(2)}`;
  return formattedValue;
}





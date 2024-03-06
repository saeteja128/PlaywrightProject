import path from "path";
import { Page } from "playwright";
import fs from "fs";

export default class CommonBase {
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

const ROOT_DIR = process.cwd();
console.log(ROOT_DIR);
export let fileSep = path.sep;
console.log(fileSep);
export const TESTDATAFOLDER: string =
  ROOT_DIR + fileSep + "tests" + fileSep + "e-commerce" + fileSep + "test-data";
console.log("Directory in Common Base: ", TESTDATAFOLDER);

//File Path related to Signin of the user based on the user input
export const SIGNIN_DATA: string = TESTDATAFOLDER + fileSep + "luma_signin.csv";
export const SIGNIN_CSV_FILEPATH = path.resolve(__dirname, SIGNIN_DATA);
export const SIGNIN_FILE_CONTENT = fs.readFileSync(SIGNIN_CSV_FILEPATH, {
  encoding: "utf-8",
});

//File Path related to Filters Selection in the Respective Product Page
export const FILTER_DATA: string =
  TESTDATAFOLDER + fileSep + "filter_selection1.csv";
export const FILTER_CSV_FILEPATH = path.resolve(__dirname, FILTER_DATA);
export const FILTER_FILE_CONTENT = fs.readFileSync(FILTER_CSV_FILEPATH, {
  encoding: "utf-8",
});

// //File Path related to Category Selection of the Product based on the user input
export const CATEGORY_DATA: string =
  TESTDATAFOLDER + fileSep + "product_category.csv";
export const CATEGORY_CSV_FILEPATH = path.resolve(__dirname, CATEGORY_DATA);
export const CATEGORY_FILE_CONTENT = fs.readFileSync(CATEGORY_CSV_FILEPATH, {
  encoding: "utf-8",
});

// //File Path related to Price Selection of the Product based on the user input
export const ADDCART_DATA: string = TESTDATAFOLDER + fileSep + "add_cart.csv";
export const ADDCART_CSV_FILEPATH = path.resolve(__dirname, ADDCART_DATA);
export const ADDCART_FILE_CONTENT = fs.readFileSync(ADDCART_CSV_FILEPATH, {
  encoding: "utf-8",
});

//Functions used

export function removeDigitsAfterDecimalFromArray(
  inputArray: string[]
): string[] {
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
  const FORMATTEDVALUE = `$${value.toFixed(2)}`;
  return FORMATTEDVALUE;
}

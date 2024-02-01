import { Page } from "playwright";
import COMMONBASE from "./commonBase";

interface signinrecords {
  existing_user: string;
  eu_username: string;
  eu_password: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const signincolumns = [
  "existing_user",
  "eu_username",
  "eu_password",
  "first_name",
  "last_name",
  "email",
  "password",
];

export class SIGNINPAGE extends COMMONBASE {
  constructor(page: Page) {
    super(page);
  }

  SignInButtonHome = () =>
    this.page.locator(
      "//div[@class='panel header']//a[contains(text(),'Sign In')]"
    );

  EmailTextBox = () =>
    this.page.locator("//div[@class='control']/input[@title='Email']");

  PasswordTextBox = () =>
    this.page.locator("//div[@class='control']/input[@title='Password']");

  SignInButtonLocator = () =>
    this.page.locator(
      "//div[@class='primary']/button[@class='action login primary']/span[contains(text(), 'Sign In')]"
    );

  FirstNameTextbox = () =>
    this.page.locator("//div[@class='control']/input[@name='firstname']");

  LastNameTextbox = () =>
    this.page.locator("//div[@class='control']/input[@name='lastname']");

  EmailTextbox = () =>
    this.page.locator("//div[@class='control']/input[@name='email']");

  PasswordTextbox = () =>
    this.page.locator("//div[@class='control']/input[@name='password']");

  ConfirmPasswordTextbox = () =>
    this.page.locator(
      "//div[@class='control']/input[@name='password_confirmation']"
    );

  CreateAnAccountSignInForm = () =>
    this.page.locator(
      "//a[@class='action create primary']/span[contains(text(),'Create an Account')]"
    );

  CreateAnAccountFormButton = () =>
    this.page.locator(
      "//button[@class='action submit primary']/span[contains(text(),'Create an Account')]"
    );

  async SignIn_SignUp({
    existing_user,
    eu_password,
    eu_username,
    first_name,
    last_name,
    email,
    password,
  }: signinrecords): Promise<void> {
    if (existing_user.trim().toLocaleLowerCase() == "yes") {
        console.log("Existing User Sign In");
      await this.SignInButtonHome().click();
      await this.loadStateDomContent();

      await this.EmailTextBox().fill(eu_username);
      await this.PasswordTextBox().fill(eu_password);
      await this.SignInButtonLocator().click();
      await this.loadStateDomContent();
      console.log("Existing User Logged in successfully");
    } else {
        console.log("New User Account Creation");
      await this.SignInButtonHome().click();
      await this.loadStateDomContent();

      await this.CreateAnAccountSignInForm().click()
      await this.FirstNameTextbox().fill(first_name);
      await this.LastNameTextbox().fill(last_name);
      await this.EmailTextBox().fill(email);
      await this.PasswordTextBox().fill(password);
      await this.ConfirmPasswordTextbox().fill(password);
      
      await this.CreateAnAccountFormButton().click();
      await this.loadStateDomContent();
      console.log("New User Account Creation completed successfully");
    }
  }
}

import { Page } from "@playwright/test";

export default class EXAMPLE{
    protected page: Page;
    constructor(page: Page) {
        this.page = page;
      }

      MyAccountButton = () => this.page.locator("//div[@class='zak-header-col zak-header-col--2']/nav/ul/li/a[contains(text(), 'My account')]");
      UserNameTextbox = () => this.page.locator("//*[@id='reg_username']");
      EmailTextbox = () => this.page.locator("//*[@id='reg_email']");
      PasswordTextbox = () => this.page.locator("//*[@id='reg_password']");
      RegisterButton = () => this.page.locator("//*[@id='customer_login']/div[2]/form/p[4]/button");
      HomeButton = () => this.page.locator("//div[@class='zak-header-col zak-header-col--2']/nav/ul/li/a[contains(text(),'Home')]");

      async RegisterandHome(): Promise<void>{
        await this.MyAccountButton().click();
        await this.UserNameTextbox().fill('TestOne');
        await this.EmailTextbox().fill('test@test.com');
        await this.PasswordTextbox().fill('Sureify@123');
        await this.RegisterButton().click();
        await this.HomeButton().click();
        await this.page.pause();
      }
}
import * as puppeteer from "puppeteer";


export class ProductProvider {

  async init () {
    const browser = await puppeteer.launch({headless : false});
    return {
      browser : browser,
      page : await browser.newPage()
    };

  }

  async collect  () {
    const {browser , page} = await this.init();
    // goto schedule url
    await page.goto(process.env.product_info_url);


  }
}
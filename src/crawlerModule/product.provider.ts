import * as puppeteer from "puppeteer";
import { Product } from '../model/raw/Product';

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

    //keyword입력
    await page.type("#headerSearchKeyword", process.env.product_interest_keyword1);
    await page.click("#headerSearchBtn");

    const products = await page.$$(process.env.product_wrapper);
    const productList = [];
    const lastPage = await (await (await page.$('.btn-last')).getProperty('innerText')).jsonValue();
    for(let pageNum = 1 ; pageNum < lastPage ; pageNum++){
      for(let i =0 ; i < products.length ; i++){
        const product = new Product();
        const selectedProduct = products[i];
        product.title = await (await (await selectedProduct.$('.name')).getProperty('innerText')).jsonValue();
        product.price = await (await (await selectedProduct.$('.price-value')).getProperty('innerText')).jsonValue();
        productList.push(product);
      }
      //페이지 이동
      await (await page.$('a.btn-next')).click();
    }
    return productList;
  }
}
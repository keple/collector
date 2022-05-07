import * as puppeteer from 'puppeteer';

export abstract class PuppeteerInitializer {
  async init () {
    const browser = await puppeteer.launch({headless : false, args: ['--window-size=1920,1080']});

    return {
      browser : browser,
      page : await browser.newPage()
    };
  }
}
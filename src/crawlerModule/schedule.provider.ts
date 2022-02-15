import * as puppeteer from 'puppeteer';
import { ScheduleInfo } from "../model/ScheduleInfo";

export class ScheduleProvider {

  async init () {
    const browser = await puppeteer.launch({headless : false});
    return {
      browser : browser,
      page : await browser.newPage()
    };

  }
  async collect(){
    //create browser
    const {browser , page} = await this.init();
    // goto schedule url
    await page.goto(process.env.schedule_info_url);
    //parsing date

    //parsing items
    const rowHandles = await page.$$('.row');
    const scheInfo = [];
    let date;
    for (const item of rowHandles) {
      const handleDate = await item.$('.navbar-inverse');
      if(handleDate!==undefined&& handleDate != null){
        const datehandle = await handleDate.$('.holodule .navbar-text');
        date = await datehandle.getProperty("innerText");
        continue;
      }
      const handleTimeAndName = await item.$$('.thumbnail');
      for(const thumbnail of handleTimeAndName){
        const thumbnailSrc = await (await (await thumbnail.$$('img'))[1].getProperty('src')).jsonValue();
        const time = await (await (await thumbnail.$('.datetime')).getProperty("innerText")).jsonValue();
        const name = await (await (await thumbnail.$('.name')).getProperty("innerText")).jsonValue();
        const inf = new ScheduleInfo();
        inf.date = await date.jsonValue();
        inf.time = time;
        inf.name = name;
        inf.thumbnail = thumbnailSrc;
        scheInfo.push(inf);
      }
    }
    await browser.close();
    return scheInfo;
  }
}
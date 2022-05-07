import * as puppeteer from 'puppeteer';
import { ScheduleInfo } from "../model/raw/ScheduleInfo";
import { PuppeteerInitializer } from './puppeteerInitializer';
import { logger } from '../../winston.config';

export class ScheduleProvider  extends PuppeteerInitializer{

  async collect(){
    //create browser
    const {browser , page} = await this.init();
    await page.setViewport({
      width:1920,
      height:1080
    })
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
        const datehandle = await handleDate.$(process.env.schedule_wrapper);
        date = await datehandle.getProperty("innerText");
        continue;
      }
      const handleTimeAndName = await item.$$('.thumbnail');
      for(const thumbnail of handleTimeAndName){
        try{
          //find thumbnail img
          const imgsInThumbnail = await thumbnail.$$('img');
          //img index 1 is main image
          const mainImg = await imgsInThumbnail[1].getProperty('src');
          const thumbnailSrc = await mainImg.jsonValue();

          //find time in thumbnail
          const timeInThumbnail = await thumbnail.$('.datetime');
          const timeValueHandle = await timeInThumbnail.getProperty('innerText');
          const time = await timeValueHandle.jsonValue();

          //find name in thumbnail
          const nameInThumbnailHandle = await thumbnail.$('.name');
          const nameValueHandle = await nameInThumbnailHandle.getProperty('innerText');
          const name = await nameValueHandle.jsonValue();
          const inf = new ScheduleInfo();
          inf.date = await date.jsonValue();
          inf.time = time;
          inf.name = name;
          inf.thumbnail = thumbnailSrc;
          scheInfo.push(inf);
        }catch(error){
          logger.error(`cannot find informations in thumbnail class `);
        }
      }
    }
    await browser.close();

    return scheInfo;
  }
}
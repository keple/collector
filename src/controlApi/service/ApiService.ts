import { Injectable } from "@nestjs/common";
import { ScheduleProvider } from "../../crawlerModule/schedule.provider";


@Injectable()
export class ApiService {

  constructor (private readonly scheduleProvider : ScheduleProvider) {

  }
  async doCrawl () {
    await this.scheduleProvider.init();

    const schedules = await this.scheduleProvider.collect();

    for (const sche of schedules){
      console.log(sche)
    }
  }

}
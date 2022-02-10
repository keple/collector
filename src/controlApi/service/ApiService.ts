import { Injectable } from "@nestjs/common";
import { ScheduleProvider } from "../../crawlerModule/schedule.provider";
import { HSRefiner } from "../../refiner/HSRefiner";


@Injectable()
export class ApiService {

  constructor (private readonly scheduleProvider : ScheduleProvider,
               private readonly refiner : HSRefiner) {

  }
  async doCrawl () {
    await this.scheduleProvider.init();

    const schedules = await this.scheduleProvider.collect();

    this.refiner.refineInfo(schedules);
  }

}
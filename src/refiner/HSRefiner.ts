import { InfoRefiner } from "./InfoRefiner";
import { RefinedSchedule } from "../model/RefinedSchedule";
import { ScheduleInfo } from "../model/ScheduleInfo";
import { Injectable } from "@nestjs/common";


@Injectable()
export class HSRefiner implements InfoRefiner<RefinedSchedule, ScheduleInfo>{


  refineInfo(source: Array<ScheduleInfo>): Array<RefinedSchedule> {
    const refinedArray = [];

    return refinedArray;
  }

}
import { InfoRefiner } from "./InfoRefiner";
import { RefinedSchedule } from "../Model/RefinedSchedule";
import { ScheduleInfo } from "../Model/ScheduleInfo";
import { Injectable } from "@nestjs/common";


@Injectable()
export class HSRefiner implements InfoRefiner<RefinedSchedule, ScheduleInfo>{


  refineInfo(source: Array<ScheduleInfo>): Array<RefinedSchedule> {
    const refinedArray = [];

    return refinedArray;
  }

}
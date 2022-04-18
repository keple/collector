import { InfoRefiner } from "./InfoRefiner";
import { RefinedSchedule } from "../model/refined/RefinedSchedule";
import { ScheduleInfo } from "../model/raw/ScheduleInfo";
import { Injectable } from "@nestjs/common";


@Injectable()
export class HSRefiner implements InfoRefiner<RefinedSchedule, ScheduleInfo>{


  refineInfo(source: Array<ScheduleInfo>): Array<RefinedSchedule> {

    return source.map(this.refineFunction,this).filter((item)=>{return item!==undefined});
  }
  refineFunction (item) :RefinedSchedule {
    if(this.validate(item)){
      const refined = new RefinedSchedule();
      refined.time = item.time;
      refined.name = item.name;
      // thumbnail img 를 로컬에 저장하고, 저장된 path를 리턴하는 서비스 생성해야함
      refined.thumbnailUrl = item.thumbnail;
      return refined;
    }else{
      return undefined;
    }
  }
  validate (item:ScheduleInfo) {
    let keys = Object.keys(item);
    let flag = true;
    for(const key of keys){
      if(item[key]===undefined || item[key].length===0){
        flag = false;
        break;
      }
    }
    return flag;
  }
}
import { ScheduleProvider } from "./schedule.provider";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  providers : [ScheduleProvider],
  exports : [ScheduleProvider]
})
export class CrawlerModule{}

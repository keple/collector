import { ScheduleProvider } from "./schedule.provider";
import { Global, Module } from "@nestjs/common";
import { ProductProvider } from "./product.provider";

@Global()
@Module({
  providers : [ScheduleProvider, ProductProvider],
  exports : [ScheduleProvider, ProductProvider]
})
export class CrawlerModule{}

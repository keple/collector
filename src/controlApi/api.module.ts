import { Module } from "@nestjs/common";
import { ApiService } from "./service/ApiService";
import { CrawlerModule } from "../crawlerModule/crawler.module";
import { ApiController } from "./controller/ApiController";
import { RefinerModule } from "../refiner/refiner.module";
import { KafkaModule } from "../kafka/kafka.module";


@Module({
  imports : [CrawlerModule , RefinerModule, KafkaModule],
  providers : [ApiController, ApiService],
  controllers : [ApiController]
})

export class ApiModule {}
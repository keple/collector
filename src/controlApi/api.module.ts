import { Module } from "@nestjs/common";
import { ApiService } from "./service/ApiService";
import { CrawlerModule } from "../crawlerModule/crawler.module";
import { ApiController } from "./controller/ApiController";


@Module({
  imports : [CrawlerModule],
  providers : [ApiController, ApiService],
  controllers : [ApiController]
})

export class ApiModule {}
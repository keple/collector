import { KafkaConfiguration } from "./kafka.configuration";
import { Module } from "@nestjs/common";

@Module({
  providers : [KafkaConfiguration],
  exports : [KafkaConfiguration]
})

export class KafkaModule {};
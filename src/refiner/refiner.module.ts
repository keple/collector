import { HSRefiner } from "./HSRefiner";
import { Module } from "@nestjs/common";


@Module({
  providers : [HSRefiner],
  exports : [HSRefiner]
})

export class RefinerModule {};
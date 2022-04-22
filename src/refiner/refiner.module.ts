import { HSRefiner } from "./HSRefiner";
import { Module } from "@nestjs/common";
import { ProductRefiner } from "./ProductRefiner";


@Module({
  providers : [HSRefiner, ProductRefiner],
  exports : [HSRefiner, ProductRefiner]
})

export class RefinerModule {};
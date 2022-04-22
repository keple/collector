import { Controller, Get, Post } from "@nestjs/common";
import { ApiService } from '../service/ApiService';

@Controller("/api")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post("/collectSchedule")
  async collectSchedule() {
    return this.apiService.collectSchedule();
  }
  @Post("/collectProduct")
  async collectProduct () {
    return this.apiService.collectProduct();
  }
}

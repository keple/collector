import { Controller, Get, Post } from "@nestjs/common";
import { ApiService } from '../service/ApiService';

@Controller("/api")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post("/requestCrawl")
  async requestCrawl() {
    return this.apiService.doCrawl();
  }
}

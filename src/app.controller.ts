import { Controller, Post, CACHE_MANAGER, Inject } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { ClientsModule, ClientProxy } from "@nestjs/microservices";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags("统计访问次数")
  @Post("center")
  async getCenter() {
    return this.appService.getNum();
  }
}

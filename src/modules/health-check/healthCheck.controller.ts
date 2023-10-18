import { Controller, Get, Inject } from "@nestjs/common";
import { ApiResponse } from "../../providers/api-response";
import { HealthService } from "./healthCheck.service";
import { RequestCtx, RequestCtxProvider } from "../../common/decorators/requestContext.decorator";
@Controller("healthCheck")
export class HealthController {
  @Inject()
  private healthService: HealthService;

  @Get("/")
  async healthCheck(@RequestCtxProvider() ctx: RequestCtx) {
    const response = await this.healthService.checkConnections(ctx);
    return new ApiResponse(response, ctx.logId);
  }
}

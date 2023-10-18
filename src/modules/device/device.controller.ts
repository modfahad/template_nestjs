import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RequestCtx, RequestCtxProvider } from "../../common/decorators/requestContext.decorator";
import { ApiResponse } from "../../providers/api-response";
import { DeviceService } from "./device.service";

@Controller("device")
@ApiTags("device")
export class DeviceController {
  @Inject()
  private deviceService: DeviceService;

  @Post("/list")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ApiResponse, description: "get user category using user id based on user plan" })
  async getUserCategory(@RequestCtxProvider() ctx: RequestCtx, @Body("userId") userId: string) {
    const resp = await this.deviceService.getUserCategory(ctx, userId);
    return new ApiResponse(resp, ctx.logId);
  }
}

import { Inject, Injectable } from "@nestjs/common";
import { LogService } from "../../common/services/log.service";
import { RequestCtx } from "../../common/decorators/requestContext.decorator";

@Injectable()
export class DeviceService {
  @Inject()
  private logService: LogService;

  async getUserCategory(ctx: RequestCtx, userId: string) {
    this.logService.info(ctx.logId, `Getting user category based on user plan with id ${userId}`);
    return { userCategory: [] };
  }
}

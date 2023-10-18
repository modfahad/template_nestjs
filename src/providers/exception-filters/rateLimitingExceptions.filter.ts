import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { ThrottlerException } from "@nestjs/throttler";
import { LogService } from "../../common/services/log.service";
import { ApiResponse } from "../api-response";

@Catch(ThrottlerException)
export class RateLimitingErrorFilter implements ExceptionFilter {
  @Inject()
  private logService: LogService;

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const logId = request.id;

    // const { message } = exception;

    this.logService.error(logId, `inside RateLimitingErrorFilter ....`);
    this.logService.error(logId, `exception=${JSON.stringify(exception)}`);

    const apiResp = new ApiResponse<any>(null, logId, "rate-limit", -10, "rate-limit");

    response.status(status).json(apiResp);
  }
}

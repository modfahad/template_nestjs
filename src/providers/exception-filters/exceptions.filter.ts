import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { LogService } from "../../common/services/log.service";
import { ApiResponse } from "../api-response";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  @Inject()
  private logService: LogService;

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const errCode = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const logId = request.id;

    let finalErrMsg = "";
    const { message } = exception;

    try {
      const errResp = exception.getResponse();
      const errMsg = errResp["message"];
      finalErrMsg = `${message} : ${errMsg[0]}`;
    } catch (e) {
      finalErrMsg = `${message}`;
    }

    this.logService.error(logId, `exception=${JSON.stringify(exception)}`);
    const apiResp = new ApiResponse<any>(null, logId, "", errCode, finalErrMsg);
    response.status(errCode).json(apiResp);
  }
}

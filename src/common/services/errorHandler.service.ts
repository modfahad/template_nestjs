import { MiscMessages } from "../../constants/enums";
import { _slackNotifyForError } from "./slack.service";
import { _convertObjectToJSONString } from "./utils.service";
_convertObjectToJSONString;
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentType } from "../../constants/enums";
import { LogService } from "./log.service";

export interface ErrorMetaData {
  methodName: string;
  userId?: string;
  emailId?: string;
  sendErrorNotification?: boolean;
  eventData?: string;
  endPoint?: string;
  errorType?: string;
}

@Injectable()
export class ErrorHandlerService {
  @Inject()
  private logService: LogService;

  @Inject()
  private configService: ConfigService;

  handleError(e: any, logId: string, errorMetaData: ErrorMetaData) {
    const handlerMethodName = `ErrorHandlerService.handleError`;
    const {
      emailId,
      sendErrorNotification,
      methodName,
      userId,
      endPoint,
      errorType = "non-transaction error",
    } = errorMetaData;
    try {
      this.logService.info(logId, `inside  ${handlerMethodName}...errorType=[${errorType}]`);
      const { message, error, code = -1 } = e;
      this.logService.info(logId, `ERROR in ${methodName}=[${_convertObjectToJSONString(logId, e)}]`);

      //form error msg for logging
      let finalErrorMsg = `error in [${methodName}] , message=[${message}] , error=[${error}] , errorType=[${errorType}] , code=[${code}]`;
      finalErrorMsg += `emailId=[${emailId}] , userId=[${userId}]`;
      this.logService.error(logId, finalErrorMsg);

      const isProd = this.configService.get("nodeEnv") === EnvironmentType.PRODUCTION;
      const finalSendErrorNotification = sendErrorNotification || isProd;
      this.logService.info(
        logId,
        `inside handleError , isProd=[${isProd}] , finalSendErrorNotification=[${finalSendErrorNotification}]`,
      );

      //send notification only if this is true
      if (finalSendErrorNotification) {
        _slackNotifyForError({
          isProd,
          logId,
          msg: finalErrorMsg,
          serviceName: this.configService.get("appName"),
          endPoint: endPoint ? endPoint : "n/a",
        });
      } else {
        this.logService.error(logId, MiscMessages.SKIP_SLACK_MSG);
      }
      this.logService.info(logId, `successfully executed ${handlerMethodName}`);
    } catch (e) {
      const { message, error } = e;
      const finalErrorMsg = `error in [${methodName}] + ${handlerMethodName} , message=[${message}] , error=[${error}] `;
      this.logService.error(logId, finalErrorMsg);
      _slackNotifyForError({
        isProd: this.configService.get("nodeEnv") === EnvironmentType.PRODUCTION,
        logId,
        msg: finalErrorMsg,
        serviceName: this.configService.get("appName"),
        endPoint: endPoint ? endPoint : "n/a",
      });
    }
  }
}

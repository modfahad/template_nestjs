import { Inject, Injectable } from "@nestjs/common";
import { isEmpty, isNil } from "ramda";
import { RequestCtx } from "../decorators/requestContext.decorator";
import { ErrorHandlerService } from "./errorHandler.service";
import { LogService } from "./log.service";

export class SelfiParams {
  isSelfieOptional: boolean;
  isSelfiePending: boolean;
  isSelfieSkipped: boolean;
}

export class KycParams {
  isKycPending: boolean;
  isKycRequired: boolean;
}

@Injectable()
export class CommonService {
  @Inject()
  private logService: LogService;

  @Inject()
  private errorHandlerService: ErrorHandlerService;

  getTodayDate() {
    const now = new Date();
    const dd = now.getDate();
    const tempMonth = now.getMonth() + 1;
    const mm = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
    const yy = now.getFullYear();

    const expiryDate = `${dd}-${mm}-${yy}`;
    return expiryDate;
  }

  getCurrentEpoch(ctx: RequestCtx) {
    const nowEpoch = Math.ceil(Date.now() / 1000);
    this.logService.info(ctx.logId, `inside getCurrentEpoch , returning [${nowEpoch}]`);
    return `${nowEpoch}`;
  }

  async delay(ctx: RequestCtx, delaySecond: number) {
    this.logService.info(ctx.logId, `inside delay delaySecond=[${delaySecond}]`);
    return new Promise((res) => setTimeout(res, delaySecond * 1000));
  }

  /**
   *
   * @param obj
   * @param ctx
   * @returns
   *
   * is obj is : null/undefined/{} then returns true
   */
  isNotPresent(obj: any): boolean {
    if (isNil(obj)) {
      return true;
    }
    if (isEmpty(obj)) {
      return true;
    }
    return false;
  }

  getTimeStampString(ctx: RequestCtx): string {
    this.logService.info(ctx.logId, `inside getTimeStampString...`);
    const timeStampStr = "01/12/2022 16:56"; //moment().format("DD/MM/YYYY HH:mm");
    return timeStampStr;
  }
}

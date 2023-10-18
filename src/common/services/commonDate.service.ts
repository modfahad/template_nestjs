import { Inject, Injectable } from "@nestjs/common";
import * as moment from "moment";
import { RequestCtx } from "../decorators/requestContext.decorator";
import { LogService } from "./log.service";
const TIMESTAMP_STRING_FORMAT = "DD/MM/YYYY HH.mm";

@Injectable()
export class CommonDateService {
  @Inject()
  private logService: LogService;

  daysBetween2(date1: Date, date2: Date) {
    date1 = new Date(date1.toDateString());
    date2 = new Date(date2.toDateString());
    const daysDifference = moment(date2).diff(moment(date1), "days");
    return daysDifference;
  }

  getCurrentDateString(): string {
    return moment().format(TIMESTAMP_STRING_FORMAT);
  }

  getDateUsingString(ctx: RequestCtx, date: string) {
    this.logService.info(ctx.logId, `inside getDateUsingString : [${date}]`);
    const [day, month, year] = date.split(/[-/]/);
    const formattedDate = moment(`${year}-${month}-${day}`).utcOffset("+0530").toDate();
    this.logService.info(ctx.logId, `[${day}], [${month}], [${year}] formattedDate:[${formattedDate}]`);
    return formattedDate;
  }
}

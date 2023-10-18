import { Injectable, LoggerService } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { format } from "winston";
const DailyRotateFile = require("winston-daily-rotate-file");
const { combine, timestamp, printf } = format;
import Console from "winston-console-transport";

const appName = process.env.APP_NAME;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${appName}] [${level}] [${message}]`;
});

@Injectable()
export class LogService implements LoggerService {
  private logger = WinstonModule.createLogger({
    transports: [
      new DailyRotateFile({
        handleExceptions: true,
        filename: `logs/${appName}-%DATE%.log`,
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "100m",
        JSON: true,
      }),
      new Console(),
    ],

    format: combine(timestamp(), myFormat),
  });

  private getLogData(ctx: string, msg: any) {
    const log = {
      service: appName,
      id: ctx,
      data: msg,
    };
    return JSON.stringify(log);
  }

  info(ctx: string, msg: any) {
    const data = this.getLogData(ctx, msg);
    this.logger.log(data);
  }

  private err(ctx: string, msg: any) {
    const data = this.getLogData(ctx, msg);
    this.logger.error(data);
  }

  private wrn(ctx: string, msg: any) {
    const data = this.getLogData(ctx, msg);
    this.logger.warn(data);
  }

  printObject(ctx: string, msg: string, inputObj: any) {
    this.info(ctx, `in printObject...`);

    if (!inputObj) {
      this.info(ctx, `obj was undefined `);
      return;
    }
    try {
      let objString = "";
      const keys = Object.keys(inputObj);
      for (const k of keys) {
        objString += `${k}=[${inputObj[k]}]  <#> `;
      }
      this.info(ctx, `${msg} => ${objString}`);
    } catch (e) {
      const { message, error } = e;
      this.info(ctx, `error in printObject => message=[${message}] , error=[${error}]`);
    }
  }

  log(message: any, ...optionalParams: any[]) {
    this.info(message, optionalParams[0] || "n/a");
  }
  error(message: any, ...optionalParams: any[]) {
    this.err(message, optionalParams[0] || "n/a");
  }
  warn(message: any, ...optionalParams: any[]) {
    this.wrn(message, optionalParams[0] || "n/a");
  }
}

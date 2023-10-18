import { Module } from "@nestjs/common";
import { CommonDateService } from "./services/commonDate.service";
import { ErrorHandlerService } from "./services/errorHandler.service";
import { LogService } from "./services/log.service";
import { CommonService } from "./services/common.service";

import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";

import { ValidateReqService } from "./services/validateReq.service";
import { AwsService } from "./services/aws.service";

@Module({
  providers: [
    CommonDateService,
    LogService,
    ErrorHandlerService,
    CommonService,
    ConfigService,
    PrismaService,
    ValidateReqService,
    AwsService,
  ],
  exports: [CommonDateService, LogService, ErrorHandlerService, CommonService, ValidateReqService, AwsService],
})
export class CommonModule {}

import { Inject, Injectable } from "@nestjs/common";
import { LogService } from "./log.service";
import { AwsService } from "./aws.service";
import { ConfigService } from "@nestjs/config";
import { CommonService } from "./common.service";
@Injectable()
export class ValidateReqService {
  @Inject()
  private logService: LogService;

  @Inject()
  private awsService: AwsService;

  @Inject()
  private configService: ConfigService;

  @Inject()
  private commonService: CommonService;
}

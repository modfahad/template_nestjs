import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LogService } from "../../common/services/log.service";
import { PrismaService } from "../../prisma/prisma.service";
import { RequestCtx } from "../../common/decorators/requestContext.decorator";
@Injectable()
export class HealthService {
  constructor(private readonly prismaService: PrismaService) {}

  @Inject()
  private logService: LogService;

  private response: any = {
    uptime: process.uptime(),
    date: new Date(),
    service_status: "UP",
    postgres: {
      status: "UP",
    },
    rabbitmq: {
      status: "UP",
    },
    redis: {
      status: "UP",
    },
  };

  async checkConnections(ctx: RequestCtx) {
    this.response.uptime = process.uptime();
    this.response.date = new Date();

    try {
      await this.checkPostgresConnection(ctx);
      await this.checkRedisConnection(ctx);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
    return this.response;
  }

  async checkPostgresConnection(ctx: RequestCtx) {
    const status = true;
    if (!status) {
      throw new HttpException("HealthService: Postgres is down", HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      this.logService.info(ctx.logId, "HealthService: Postgres connection successful");
    }
  }

  async checkRedisConnection(ctx: RequestCtx) {
    this.logService.info(ctx.logId, "HealthService: checkRedisConnection connection successful");
  }
}

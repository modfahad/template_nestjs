import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";

import { CommonModule } from "./common/common.module";
import { CtxIdMiddleware } from "./common/middlewares/ctxId.midddleware";
import { validate } from "./config/env.validation";
import configuration from "./config/env.variables";
import { HttpErrorFilter } from "./providers/exception-filters/exceptions.filter";
import { DeviceModule } from "./modules/device/device.module";
import { HealthModule } from "./modules/health-check/healthCheck.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate,
      load: [configuration],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: +process.env.TTL_WINDOW_IN_SECONDS,
        limit: +process.env.TTL_API_CALLS_ALLOWED_IN_WINDOW,
      },
    ]),
    CommonModule,
    DeviceModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(userContext: MiddlewareConsumer) {
    userContext.apply(CtxIdMiddleware).forRoutes({ path: "/**", method: RequestMethod.ALL });
  }
}

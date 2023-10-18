import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import * as morgan from "morgan";
import { ConfigService } from "@nestjs/config";

import { SetupSwagger } from "./swagger";
import { LogService } from "./common/services/log.service";

const configService = new ConfigService();
const nodeEnv = configService.get("NODE_ENV");

console.log("NODE_ENV ----->", nodeEnv);
console.log("DATABASE_URL ----->", configService.get("DATABASE_URL"));

declare const module: any;

async function bootstrap() {
  const port = process.env.PORT || 3002;
  const apiPrefix = "/api/v1";

  const app = await NestFactory.create(AppModule);
  app.useLogger(new LogService());
  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(new ValidationPipe());
  SetupSwagger(app);

  app.use(morgan(":method :url :status :response-time ms"));
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

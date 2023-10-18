import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
const configService = new ConfigService();
export function SetupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle("service")
    .setBasePath("api/v1")
    .setDescription("Some Description")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [],
  });
  console.log(`swagger url ---> ${configService.get("BASE_URL")}/api/v1/docs`);
  SwaggerModule.setup("api/v1/docs", app, document);
}

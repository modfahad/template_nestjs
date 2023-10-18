import { Module } from "@nestjs/common";
import { CommonModule } from "../../common/common.module";
import { PrismaService } from "../../prisma/prisma.service";
import { HealthController } from "./healthCheck.controller";
import { HealthService } from "./healthCheck.service";

@Module({
  imports: [CommonModule],
  controllers: [HealthController],
  providers: [HealthService, PrismaService],
})
export class HealthModule {}

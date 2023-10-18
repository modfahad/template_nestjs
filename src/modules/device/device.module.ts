import { Module } from "@nestjs/common";
import { CommonModule } from "../../common/common.module";
import { PrismaService } from "../../prisma/prisma.service";
import { DeviceController } from "./device.controller";
import { DeviceService } from "./device.service";

@Module({
  imports: [CommonModule],
  controllers: [DeviceController],
  providers: [DeviceService, PrismaService],
})
export class DeviceModule {}

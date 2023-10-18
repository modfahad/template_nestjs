import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LogService } from "./log.service";
import { config, S3 } from "aws-sdk";
import { RequestCtx } from "../decorators/requestContext.decorator";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AwsService {
  @Inject()
  private logService: LogService;

  constructor(private readonly configs: ConfigService) {
    config.update({
      secretAccessKey: this.configs.get("aws.awsSecretAccessKey"),
      accessKeyId: this.configs.get("aws.awsAccessKeyId"),
      region: this.configs.get("aws.region"),
      signatureVersion: "v4",
    });
  }

  async uploadFile(
    ctx: RequestCtx,
    directoryPath: string,
    buffer: Buffer,
    auxiliaryParams: any | null,
    uploadInBucket: string,
  ) {
    try {
      const finalBucketName = uploadInBucket;
      this.logService.info(
        ctx.logId,
        `Inside [awsService.uploadFile], bucket:[${finalBucketName}], directoryPath:[${directoryPath}]`,
      );
      const s3 = new S3();
      const params = {
        Bucket: finalBucketName,
        BucketKeyEnabled: true,
        Key: directoryPath,
        Body: buffer,
        ACL: "private",
      };
      if (auxiliaryParams && auxiliaryParams.isPublic) {
        params.ACL = "public-read";
      }
      await s3.putObject(params).promise();
      const fileUrl = `https://${finalBucketName}.s3.ap-south-1.amazonaws.com/${params.Key}`;
      this.logService.info(ctx.logId, `File uploaded successfully,[${fileUrl}]`);
      return { fileUrl, bucketName: finalBucketName };
    } catch (e) {
      const { error, message } = e;
      throw new HttpException(`Issue while uploadFile error:[${error}], message:[${message}]`, HttpStatus.BAD_REQUEST);
    }
  }

  async readFileFromS3(ctx: RequestCtx, bucketName: string, dirName: string, fileName: string) {
    try {
      this.logService.info(ctx.logId, `Inside [readFileByUrl]`);
      const params = {
        Bucket: `${bucketName}`,
        Key: `${dirName}/${fileName}`,
      };
      const s3Object = await new S3().getObject(params).promise();
      const buffer = s3Object.Body;
      return buffer;
    } catch (e) {
      const { error, message } = e;
      throw new HttpException(
        `Issue while readFileByUrl error:[${error}], message:[${message}]`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

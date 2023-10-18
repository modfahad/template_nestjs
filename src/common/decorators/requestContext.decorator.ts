import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CommonDateService } from "../services/commonDate.service";

export const CtxId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.id;
});

export class RequestCtx {
  logId: string;
  endPoint: string;
  requestReceivedTimeStamp: string;
}

export const RequestCtxProvider = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const contextId = request.headers["x-request-id"];
  const generatedLogId = `${Math.random().toString(36).replace("0.", "")}${Math.random()
    .toString(36)
    .replace("0.", "")}`;
  const logId = contextId ? contextId : generatedLogId;
  const { url } = request;
  const ctxReturn: RequestCtx = {
    endPoint: url,
    logId,
    requestReceivedTimeStamp: new CommonDateService().getCurrentDateString(),
  };
  return ctxReturn;
});

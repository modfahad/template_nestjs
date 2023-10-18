import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
  applyDecorators,
  UseGuards,
  createParamDecorator,
  Inject,
  SetMetadata,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { LogService } from "../services/log.service";
import { ErrorCode, ErrorMessage } from "../../constants/appConstants";
import { Reflector } from "@nestjs/core";
@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private configService: ConfigService;

  @Inject()
  private logService: LogService;

  private logId: string;

  private token: string;

  private remoteIp: string;
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as any;
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    this.logId = req?.id ? req.id : `${this.configService.get("appName")}`;
    this.remoteIp = req.headers["x-forwarded-for"] || "n/a";
    this.logService.info(
      this.logId,
      `started processing request for protected-route => ${method} : ${url} , ip=[${ip}] , remoteIp=[${this.remoteIp}]`,
    );
    if (!req.headers.authorization) return false;
    req.user = await this.validateToken(req.headers.authorization);
    const requireRoles = this.reflector.getAllAndOverride<string[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);
    if (requireRoles.length > 0) {
      const response = await this.validateUserRoles(requireRoles, req.user.userRoles);
      return response;
    }

    return true;
  }
  async validateUserRoles(requireRoles: string[], userRoles: string[]) {
    this.logService.info(this.logId, `inside role-checking middle-ware`);
    const authorized = requireRoles.some((roleReq) => userRoles.includes(roleReq));
    if (!authorized) {
      this.logService.info(this.logId, `Unauthorized Access , due to insufficient roles`);
      throw new HttpException("Unauthorized Access", HttpStatus.FORBIDDEN);
    }
    return authorized;
  }
  async validateToken(auth: string) {
    try {
      if (auth.split(" ")[0] !== "Bearer") throw new HttpException("Invalid token", HttpStatus.FORBIDDEN);
      this.token = auth.split(" ")[1];
      const decoded = await jwt.verify(this.token, this.configService.get("accessToKenSecretKey"));
      return decoded;
    } catch (err) {
      const { name = "*" } = err;
      this.logService.error(this.logId, `error while validating JWT : ${name}`);
      if (name === "TokenExpiredError") {
        throw new HttpException(ErrorMessage.ACCESS_TOKEN_EXPIRED, ErrorCode.ACCESS_TOKEN_EXPIRED);
      } else {
        throw new HttpException(ErrorMessage.UN_AUTHORIZED, HttpStatus.FORBIDDEN);
      }
    }
  }
}
export function JwtVerification(...roles: string[]) {
  return applyDecorators(SetMetadata("roles", roles), UseGuards(AuthGuard));
}
export const GetUserIdFromToken = createParamDecorator((data, req): string => {
  const user = req.args[0].user;
  return user.userId;
});

import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";

@Injectable()
export class CtxIdMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    req["id"] = v4().replace(/-/g, "");
    next();
  }
}

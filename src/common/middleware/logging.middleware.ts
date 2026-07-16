import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, ip } = req;
    const userAgent = req.get("user-agent") || "";

    console.log(`${method} ${url} - IP: ${ip} - User-Agent: ${userAgent}`);

    next();
  }
}

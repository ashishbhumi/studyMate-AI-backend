import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class UserHeaderInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const isPublic =
      this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler()) ||
      this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getClass());

    if (isPublic) {
      return next.handle();
    }

    const headers = request.headers;
    const userIdHeader = headers["user-id"];

    if (!userIdHeader) {
      throw new BadRequestException({
        statusCode: 400,
        message: "Missing required header: user-id",
        missing: ["user-id"],
      });
    }

    // Store userId in request for use in controllers
    request.userId = userIdHeader;

    return next.handle();
  }
}

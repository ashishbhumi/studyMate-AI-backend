import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from "@nestjs/common";

export interface UserIdentityDto {
  userId: number;
}

export const UserIdentity = createParamDecorator<UserIdentityDto>(
  (data: unknown, context: ExecutionContext): UserIdentityDto => {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers["user-id"];

    if (!userId) {
      throw new BadRequestException({
        statusCode: 400,
        message: "Missing required header: user-id",
        missing: ["user-id"],
      });
    }

    return {
      userId: parseInt(userId as string),
    };
  },
);

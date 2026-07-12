import { IsOptional, IsString, IsBoolean, IsUUID } from "class-validator";
import { Type } from "class-transformer";

export class SearchDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsUUID()
  folder?: string;

  @IsOptional()
  @IsUUID()
  tag?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  pinned?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}

import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UsersService } from "../services/users.service";
import { UpdateProfileDto } from "../dto/update-profile.dto";
import { IUserResponse } from "../interfaces/user.interface";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@ApiTags("Users")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("profile")
  @ApiOperation({ summary: "Get user profile" })
  @ApiResponse({
    status: 200,
    description: "Profile retrieved successfully",
  })
  async getProfile(@Request() req): Promise<IUserResponse> {
    return this.usersService.getProfile(req.user.sub);
  }

  @Patch("profile")
  @ApiOperation({ summary: "Update user profile" })
  @ApiResponse({
    status: 200,
    description: "Profile updated successfully",
  })
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<IUserResponse> {
    return this.usersService.updateProfile(req.user.sub, updateProfileDto);
  }

  @Delete()
  @ApiOperation({ summary: "Delete user account" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  async deleteUser(@Request() req): Promise<void> {
    return this.usersService.deleteUser(req.user.sub);
  }
}

import { Controller, Get, Patch, Delete, Body, UseGuards, Request } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UpdateProfileDto } from "../dto/update-profile.dto";
import { IUserResponse } from "../interfaces/user.interface";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("profile")
  async getProfile(@Request() req): Promise<IUserResponse> {
    return this.usersService.getProfile(req.user.sub);
  }

  @Patch("profile")
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<IUserResponse> {
    return this.usersService.updateProfile(req.user.sub, updateProfileDto);
  }

  @Delete()
  async deleteUser(@Request() req): Promise<void> {
    return this.usersService.deleteUser(req.user.sub);
  }
}

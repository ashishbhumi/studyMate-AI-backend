import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { User } from "../../users/user.entity";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post("refresh")
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<AuthResponseDto> {
    return this.authService.refresh(refreshTokenDto);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req): Promise<void> {
    return this.authService.logout(req.user.sub);
  }
}

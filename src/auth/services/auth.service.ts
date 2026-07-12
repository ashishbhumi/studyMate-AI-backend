import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserRepository } from "../../users/repositories/user.repository";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { User } from "../../users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password, name } = registerDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    const savedUser = await this.userRepository.getRepository().save(user);

    return savedUser;
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const tokens = await this.generateTokens(user.id, user.email);

    await this.userRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
    const { refreshToken } = refreshTokenDto;

    const user = await this.userRepository.findByRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || "refresh-secret",
      });

      if (payload.sub !== user.id) {
        throw new UnauthorizedException("Invalid refresh token");
      }
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const tokens = await this.generateTokens(user.id, user.email);

    await this.userRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await this.userRepository.clearRefreshToken(userId);
  }

  private async generateTokens(
    userId: string,
    email: string,
  ): Promise<AuthResponseDto> {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || "access-secret",
      expiresIn: "15m",
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || "refresh-secret",
      expiresIn: "7d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { UpdateProfileDto } from "../dto/update-profile.dto";
import { User } from "../user.entity";
import { IUserResponse } from "../interfaces/user.interface";

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async getProfile(userId: number): Promise<IUserResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { password, refreshToken, ...userResponse } = user;
    return userResponse;
  }

  async updateProfile(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<IUserResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (updateProfileDto.name) {
      user.name = updateProfileDto.name;
    }

    if (updateProfileDto.password) {
      user.password = await bcrypt.hash(updateProfileDto.password, 10);
    }

    const updatedUser = await this.userRepository.getRepository().save(user);

    const { password, refreshToken, ...userResponse } = updatedUser;
    return userResponse;
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.userRepository.getRepository().delete(userId);
  }
}

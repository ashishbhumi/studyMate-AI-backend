import { Injectable, NotFoundException } from "@nestjs/common";
import { FolderRepository } from "../repositories/folder.repository";
import { CreateFolderDto } from "../dto/create-folder.dto";
import { UpdateFolderDto } from "../dto/update-folder.dto";
import { Folder } from "../folder.entity";
import { IFolderResponse } from "../interfaces/folder.interface";

@Injectable()
export class FoldersService {
  constructor(private folderRepository: FolderRepository) {}

  async createFolder(
    userId: number,
    createFolderDto: CreateFolderDto,
  ): Promise<IFolderResponse> {
    const folder = new Folder();
    folder.name = createFolderDto.name;
    folder.userId = userId;

    const savedFolder = await this.folderRepository
      .getRepository()
      .save(folder);

    return savedFolder;
  }

  async getFolders(userId: number): Promise<IFolderResponse[]> {
    return this.folderRepository.findByUserId(userId);
  }

  async getFolderById(id: number, userId: number): Promise<IFolderResponse> {
    const folder = await this.folderRepository.findByIdAndUserId(id, userId);
    if (!folder) {
      throw new NotFoundException("Folder not found");
    }
    return folder;
  }

  async updateFolder(
    id: number,
    userId: number,
    updateFolderDto: UpdateFolderDto,
  ): Promise<IFolderResponse> {
    const folder = await this.folderRepository.findByIdAndUserId(id, userId);
    if (!folder) {
      throw new NotFoundException("Folder not found");
    }

    if (updateFolderDto.name) {
      folder.name = updateFolderDto.name;
    }

    const updatedFolder = await this.folderRepository
      .getRepository()
      .save(folder);

    return updatedFolder;
  }

  async deleteFolder(id: number, userId: number): Promise<void> {
    const folder = await this.folderRepository.findByIdAndUserId(id, userId);
    if (!folder) {
      throw new NotFoundException("Folder not found");
    }

    await this.folderRepository.getRepository().delete(id);
  }
}

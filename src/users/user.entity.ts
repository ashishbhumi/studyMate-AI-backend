import { Folder } from "src/folders/folder.entity";
import { Note } from "src/notes/note.entity";
import { Tag } from "src/tags/tag.entity";
import { IUser } from "./interfaces/user.interface";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity("users")
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  refreshToken: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => Folder, (folder) => folder.user)
  folders: Folder[];

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];
}

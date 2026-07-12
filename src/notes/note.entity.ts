import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { User } from "../users/user.entity";
import { Folder } from "../folders/folder.entity";
import { Tag } from "src/tags/tag.entity";
import { INote } from "./interfaces/note.interface";

@Entity("notes")
export class Note implements INote {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 500 })
  title: string;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  coverImage: string;

  @Column({ type: "boolean", default: false })
  isPinned: boolean;

  @Column({ type: "boolean", default: false })
  isArchived: boolean;

  @Column({ type: "uuid", nullable: true })
  folderId: string;

  @Column({ type: "uuid" })
  userId: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.notes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Folder, (folder) => folder.notes, {
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "folderId" })
  folder: Folder;

  @ManyToMany(() => Tag, (tag) => tag.notes, { cascade: true })
  @JoinTable({
    name: "note_tags",
    joinColumn: { name: "noteId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tagId", referencedColumnName: "id" },
  })
  tags: Tag[];
}

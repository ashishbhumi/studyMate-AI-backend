import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { User } from "../users/user.entity";
import { Note } from "../notes/note.entity";
import { ITag } from "./interfaces/tag.interface";

@Entity("tags")
export class Tag implements ITag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "uuid" })
  userId: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tags, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToMany(() => Note, (note) => note.tags)
  notes: Note[];
}

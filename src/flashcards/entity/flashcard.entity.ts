import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from "typeorm";

export enum DifficultyLevel {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

@Entity("flashcards")
export class FlashcardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  noteId: number;

  @Column({ default: 1 })
  version: number;

  @Column({ type: "varchar", length: 1000 })
  question: string;

  @Column({ type: "text" })
  answer: string;

  @Column({
    type: "enum",
    enum: DifficultyLevel,
    default: DifficultyLevel.MEDIUM,
  })
  difficulty: DifficultyLevel;

  @Column({ type: "varchar", length: 500, nullable: true })
  topic: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}

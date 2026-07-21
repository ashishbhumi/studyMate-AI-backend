import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { AiController } from "./controllers/ai.controller";
import { AiService } from "./services/ai.service";
import { NotesModule } from "../notes/notes.module";

@Module({
  imports: [HttpModule, NotesModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}

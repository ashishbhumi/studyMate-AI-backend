import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { FoldersModule } from "./folders/folders.module";
import { TagsModule } from "./tags/tags.module";
import { NotesModule } from "./notes/notes.module";
import { SearchModule } from "./search/search.module";
import { AiModule } from "./ai/ai.module";
import { UserHeaderInterceptor } from "./common/interceptors/user-header.interceptor";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    FoldersModule,
    TagsModule,
    NotesModule,
    SearchModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserHeaderInterceptor,
    },
  ],
})
export class AppModule {}

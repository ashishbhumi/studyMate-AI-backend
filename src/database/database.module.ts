import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";
import { getMysqlDataSource } from "./data-source";
import { isTypeOrmSqlLoggingEnabled } from "./database.config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      logging: isTypeOrmSqlLoggingEnabled(),
      type: "mysql",
      host: process.env.MYSQL_HOST || "127.0.0.1",
      port: Number(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "root",
      database: process.env.MYSQL_DB_NAME || "mydb",
      name: getMysqlDataSource(),
      entities: [path.join(__dirname, "../../**/*.entity{.ts,.js}")],
      synchronize: false,
      timezone: "Z",
      migrationsRun: false,
    }),
  ],
  exports: [],
  providers: [],
})
export class DatabaseModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getMysqlDataSource } from "./data-source";
import { isTypeOrmSqlLoggingEnabled } from "./database.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        logging: isTypeOrmSqlLoggingEnabled(),
        type: "mysql",
        host: configService.get("MYSQL_HOST") || "127.0.0.1",
        port: Number(configService.get("MYSQL_PORT")) || 3306,
        username: configService.get("MYSQL_USER") || "root",
        password: configService.get("MYSQL_PASSWORD") || "root",
        database: configService.get("MYSQL_DB_NAME") || "mydb",
        name: getMysqlDataSource(),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true,
        timezone: "Z",
        migrationsRun: false,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [],
  providers: [],
})
export class DatabaseModule {}

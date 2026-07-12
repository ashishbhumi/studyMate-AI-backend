import { DataSourceOptions } from 'typeorm';
import { getMysqlDataSource } from './data-source';
import * as path from 'path';

/** Enable TypeORM SQL / error logging to stdout. Default off. */
export function isTypeOrmSqlLoggingEnabled(): boolean {
  const v = (process.env.TYPEORM_LOGGING ?? '').toLowerCase();
  return v === 'true' || v === '1';
}

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DB_NAME || 'mydb',
  name: getMysqlDataSource(),
  logging: isTypeOrmSqlLoggingEnabled(),
  timezone: 'Z',
  entities: [path.join(__dirname, '../../**/*.entity{.ts,.js}')],
  synchronize: false,
  migrationsRun: false,
  migrations: ['dist/db/migrations/*.js'],
};

import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

/**
 * @todo Use Serialization
 * @body Docs: https://docs.nestjs.com/techniques/serialization
 */
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }

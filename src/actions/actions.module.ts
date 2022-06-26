import { Module } from '@nestjs/common';

import { DatabaseModule } from '../modules/database/database.module';

import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { ActionsProviders } from './actions.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ActionsService, ...ActionsProviders],
  controllers: [ActionsController],
  exports: [ActionsService],
})
export class ActionsModule {}

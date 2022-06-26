import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { DatabaseModule } from '../modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}

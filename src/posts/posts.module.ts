import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PostsProviders } from './posts.providers';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [DatabaseModule],
  providers: [...PostsProviders, PostsService],
  controllers: [PostsController],
})
export class PostsModule {}

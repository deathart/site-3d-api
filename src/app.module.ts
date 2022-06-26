import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from './modules/config/config.module';
import { PostsModule } from './posts/posts.module';
import { QuotationModule } from './quotation/quotation.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DatabaseModule,
    ConfigModule,
    PostsModule,
    QuotationModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

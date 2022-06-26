import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from './modules/config/config.module';
import { BanksModule } from './banks/banks.module';

@Module({
  imports: [
    UsersModule,
    AuthModule, // TODO: Google connexion (And facebook, twitter ?)
    ActionsModule,
    DatabaseModule,
    ConfigModule,
    BanksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

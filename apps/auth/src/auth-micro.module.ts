import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthDbModule } from '../config/auth-db.module';
import { AuthConfigModule } from '../config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthConfigModule,
    LoggerModule,
    AuthDbModule,
    AuthModule,
    UsersModule,
  ],
})
export class AuthMicroModule {}

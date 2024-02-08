import { Module } from '@nestjs/common';
import { AuthDbModule } from 'apps/auth/config/auth-db.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [AuthDbModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthStrategy } from '../../../types/enum/strategy.enum';
import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.LOCAL,
) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}

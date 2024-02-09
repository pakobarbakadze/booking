import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthStrategy } from '../../../types/enum/strategy.enum';
import { JwtPayload } from '../../../types/type/jwt-payload.type';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategy.JWT) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          console.log({ headers: request.headers });
          return (
            request?.Authentication?.split(' ')[1] ||
            request?.headers.authorization?.split(' ')[1]
          );
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findOneWithId(payload.sub);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}

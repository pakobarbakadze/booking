import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../../types/type/jwt-payload.type';
import { User } from '../../users/entities/user.entity';
import { UsersRepository } from '../../users/users.repository';
import { SignUpDto } from '../dto/sign-up.dto';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly configSercive: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(
    user: User,
    deviceId: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload: JwtPayload = {
      sub: user._id.toString(),
      username: user.username,
    };

    const [accessToken, refreshToken] = await this.signTokens(payload);

    await this.refreshTokenService.insert({
      user,
      deviceId,
      token: refreshToken,
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  public signUp(signUpDto: SignUpDto): Promise<User> {
    return this.usersRepository.createAndSave(signUpDto);
  }

  public async refreshAccessToken(
    authorization: string,
  ): Promise<{ access_token: string }> {
    const refreshToken = authorization.split(' ')[1];
    const decoded = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configSercive.get<string>('REFRESH_JWT_SECRET'),
    });
    await this.refreshTokenService.validate(decoded.sub, refreshToken);
    const payload = { sub: decoded.sub, username: decoded.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  public async invalidateToken(
    authorization: string,
    devideId: string,
  ): Promise<{ message: string }> {
    const token = authorization.split(' ')[1];
    const decoded = await this.jwtService.verifyAsync(token);
    await this.refreshTokenService.invalidate(decoded.sub, devideId);

    return { message: 'Token invalidated successfully' };
  }

  private signTokens(payload: JwtPayload) {
    return Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configSercive.get<string>('REFRESH_JWT_SECRET'),
        expiresIn: '1w',
      }),
    ]);
  }
}

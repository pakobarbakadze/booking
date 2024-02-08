import { Injectable } from '@nestjs/common';

import { RefreshToken, User } from '../entities/user.entity';
import { InsertRefreshToken } from '../types/type/refresh-token.type';
import { UsersRepository } from '../users.repository';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async insert(
    insertRefreshTokenDto: InsertRefreshToken,
  ): Promise<User> {
    const { user, deviceId, token } = insertRefreshTokenDto;

    const userRecord = await this.usersRepository.findOne({ _id: user._id });
    if (!userRecord) throw new Error('User not found');

    const existingToken = userRecord.refresh_tokens.find(
      (refreshToken: RefreshToken) => refreshToken.deviceId === deviceId,
    );
    if (existingToken) throw new Error('User is already logged in');

    const refreshToken: RefreshToken = { token, deviceId };
    userRecord.refresh_tokens.push(refreshToken);

    return this.usersRepository.findOneAndUpdate({ _id: user._id }, userRecord);
  }

  public async validate(userId: string, token: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ _id: userId });
    if (!user) throw new Error('User not found');

    const existingToken = user.refresh_tokens.find(
      (refreshToken: RefreshToken) => refreshToken.token === token,
    );
    if (!existingToken) throw new Error('Refresh token not found');

    return true;
  }

  public async invalidate(userId: string, deviceId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ _id: userId });
    if (!user) throw new Error('User not found');

    console.log(user.refresh_tokens);
    console.log({ deviceId });

    user.refresh_tokens = user.refresh_tokens.filter(
      (refreshToken: RefreshToken) => refreshToken.deviceId !== deviceId,
    );

    console.log(user.refresh_tokens);

    return this.usersRepository.findOneAndUpdate({ _id: user._id }, user);
  }
}

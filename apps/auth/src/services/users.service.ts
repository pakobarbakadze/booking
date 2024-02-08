import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public findOneWithId(userId: string) {
    return this.usersRepository.findOne({ userId });
  }

  public async validateUser(username: string, password: string) {
    const user = await this.usersRepository.findOne({ username });

    if (!user) throw new UnauthorizedException('Invalid username or password');

    if (await user.validatePassword(password)) {
      return user;
    }

    return null;
  }
}

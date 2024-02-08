import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public findOneWithId(userId: string) {
    return this.usersRepository.findOne({ _id: userId });
  }

  public async validateUser(username: string, password: string) {
    const user = await this.usersRepository.findOne({ username });

    if (!user) throw new UnauthorizedException('Invalid username or password');

    if (await this.validatePassword(user, password)) {
      return user;
    }

    return null;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}

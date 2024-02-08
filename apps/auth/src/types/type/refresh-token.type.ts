import { User } from '../../entities/user.entity';

export class InsertRefreshToken {
  user: User;
  deviceId: string;
  token: string;
}

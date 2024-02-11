import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { NotificationsConfigModule } from '../config/config.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [NotificationsConfigModule, LoggerModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}

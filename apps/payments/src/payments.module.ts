import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { PaymentsConfigModule } from '../config/config.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [PaymentsConfigModule, LoggerModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}

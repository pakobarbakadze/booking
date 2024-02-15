import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { BookingDbModule } from '../config/booking-db.module';
import { BookingConfigModule } from '../config/config.module';
import { ReservationsModule } from './modules/reservations/reservations.module';

@Module({
  imports: [
    BookingDbModule,
    BookingConfigModule,
    LoggerModule,
    ReservationsModule,
  ],
})
export class BookingsModule {}

import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { BookingDbModule } from '../config/booking-db.module';
import { BookingConfigModule } from '../config/config.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    BookingDbModule,
    BookingConfigModule,
    LoggerModule,
    ReservationsModule,
    HotelsModule,
    RoomsModule,
  ],
})
export class BookingsModule {}

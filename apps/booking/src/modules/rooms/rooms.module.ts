import { Module } from '@nestjs/common';
import { BookingDbModule } from 'apps/booking/config/booking-db.module';
import { HotelsModule } from '../hotels/hotels.module';
import { Room } from './entities/room.entity';
import { RoomsController } from './rooms.controller';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';

@Module({
  imports: [BookingDbModule.forFeature([Room]), HotelsModule],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository],
  exports: [RoomsService],
})
export class RoomsModule {}

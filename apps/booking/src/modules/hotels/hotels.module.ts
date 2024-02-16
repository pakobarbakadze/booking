import { Module } from '@nestjs/common';
import { BookingDbModule } from 'apps/booking/config/booking-db.module';
import { Hotel } from './entities/hotel.entity';
import { HotelsController } from './hotels.controller';
import { HotelsRepository } from './hotels.repository';
import { HotelsService } from './hotels.service';

@Module({
  imports: [BookingDbModule.forFeature([Hotel])],
  controllers: [HotelsController],
  providers: [HotelsService, HotelsRepository],
  exports: [HotelsService],
})
export class HotelsModule {}

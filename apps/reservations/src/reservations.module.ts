import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { Reservation, ReservationSchema } from './entities/reservation.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}

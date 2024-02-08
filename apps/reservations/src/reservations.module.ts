import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ReservationsDbModule } from '../config/reservations-db.module';
import { Reservation, ReservationSchema } from './entities/reservation.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    ReservationsDbModule,
    ReservationsDbModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}

import { PAYMENTS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'apps/auth/src/modules/users/entities/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) paymentsService: ClientProxy,
  ) {}

  public create(createReservationDto: CreateReservationDto, user: User) {
    const { _id } = user;

    return this.reservationsRepository.createAndSave({
      ...createReservationDto,
      timestamp: new Date(),
      userId: _id,
    });
  }

  public findAll() {
    return this.reservationsRepository.find({});
  }

  public findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  public update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  public remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}

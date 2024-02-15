import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  public create(createReservationDto: CreateReservationDto, user: UserDto) {
    const { id, email } = user;

    return this.paymentsService
      .send('create_charge', { ...createReservationDto.charge, email })
      .pipe(
        map((res) => {
          const reservation = this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            userId: id,
          });

          return this.reservationsRepository.save(reservation);
        }),
      );
  }

  public findAll() {
    return this.reservationsRepository.findAll();
  }

  public findOne(id: string) {
    return this.reservationsRepository.findBy({ id: +id });
  }

  public update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.update(+id, updateReservationDto);
  }

  public remove(id: string) {
    return this.reservationsRepository.delete(+id);
  }
}

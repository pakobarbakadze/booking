import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { RoomsService } from '../rooms/rooms.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  public async create(
    createReservationDto: CreateReservationDto,
    user: UserDto,
  ) {
    const { roomNumber } = createReservationDto;
    const { _id, email } = user;

    await this.roomsService.checkAvailability(roomNumber);
    const room = await this.roomsService.findByRoomNumber(roomNumber);

    // TODO: when reservationsRepository.save goes on error payment should be send too

    return this.paymentsService
      .send('create_charge', { ...createReservationDto.charge, email })
      .pipe(
        map(async (res) => {
          const reservation = this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            userId: _id,
            room,
          });

          await this.roomsService.reserveRoom(room.id);

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

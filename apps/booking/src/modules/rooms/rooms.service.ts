import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HotelsService } from '../hotels/hotels.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomsRepository: RoomsRepository,
    private readonly hotelsService: HotelsService,
  ) {}

  public async create(createRoomDto: CreateRoomDto) {
    const { hotelId } = createRoomDto;

    const room = this.roomsRepository.create(createRoomDto);

    const hotel = await this.hotelsService.findOne(hotelId);
    room.hotel = hotel;

    return this.roomsRepository.save(room);
  }

  public findAll() {
    return this.roomsRepository.findAll();
  }

  public findById(id: number) {
    return this.roomsRepository.findBy({ id });
  }

  public findByRoomNumber(roomNumber: string) {
    return this.roomsRepository.findBy({ roomNumber });
  }

  public update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomsRepository.update(id, updateRoomDto);
  }

  public remove(id: number) {
    return this.roomsRepository.delete(id);
  }

  public async checkAvailability(roomNumber: string): Promise<void> {
    const room = await this.roomsRepository.findBy({ roomNumber });

    if (!room) {
      throw new NotFoundException("This room doesn't exist");
    }

    if (!room.isAvailable) {
      throw new ConflictException('This room is not available');
    }
  }

  public async reserveRoom(id: number) {
    const room = await this.roomsRepository.findBy({ id });

    room.isAvailable = false;

    return this.roomsRepository.update(room.id, room);
  }
}

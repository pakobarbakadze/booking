import { TypeormAbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsRepository extends TypeormAbstractRepository<Room> {
  protected readonly logger = new Logger(RoomsRepository.name);

  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {
    super(roomsRepository);
  }
}

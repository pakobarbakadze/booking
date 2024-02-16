import { TypeormAbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsRepository extends TypeormAbstractRepository<Hotel> {
  protected readonly logger = new Logger(HotelsRepository.name);

  constructor(
    @InjectRepository(Hotel)
    private readonly hotelsRepository: Repository<Hotel>,
  ) {
    super(hotelsRepository);
  }
}

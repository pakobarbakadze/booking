import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelsRepository } from './hotels.repository';

@Injectable()
export class HotelsService {
  constructor(private readonly hotelsRepository: HotelsRepository) {}

  public create(createHotelDto: CreateHotelDto) {
    const hotel = this.hotelsRepository.create(createHotelDto);
    return this.hotelsRepository.save(hotel);
  }

  public findAll() {
    return this.hotelsRepository.findAll();
  }

  public findOne(id: number) {
    return this.hotelsRepository.findBy({ id });
  }

  public update(id: number, updateHotelDto: UpdateHotelDto) {
    return this.hotelsRepository.update(id, updateHotelDto);
  }

  public remove(id: number) {
    return this.hotelsRepository.delete(id);
  }
}

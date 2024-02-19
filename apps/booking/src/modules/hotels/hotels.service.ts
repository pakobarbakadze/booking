import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Room } from '../rooms/entities/room.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { HotelsRepository } from './hotels.repository';

@Injectable()
export class HotelsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hotelsRepository: HotelsRepository,
  ) {}

  public async create(createHotelDto: CreateHotelDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const hotel = await queryRunner.manager.save(Hotel, createHotelDto);
      await queryRunner.manager.save(Room, {
        roomNumber: '000',
        price: 100,
        hotel,
      });

      await queryRunner.commitTransaction();
      return hotel;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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

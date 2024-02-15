import { AbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Hotel } from '../../hotels/entities/hotel.entity';

@Entity('rooms')
export class Room extends AbstractEntity {
  @Column()
  roomNumber: string;

  @Column()
  price: number;

  @Column()
  isAvailable: boolean;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  hotel: Hotel;
}

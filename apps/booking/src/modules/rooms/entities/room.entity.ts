import { AbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('rooms')
export class Room extends AbstractEntity {
  @Column({ unique: true })
  roomNumber: string;

  @Column({ default: 100 })
  price: number;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  hotel: Hotel;

  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservations: Reservation[];
}

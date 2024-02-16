import { AbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
@Entity('reservations')
export class Reservation extends AbstractEntity {
  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  userId: string;

  @Column()
  invoiceId: string;

  @ManyToOne(() => Room, (room) => room.reservations)
  room: Room;
}

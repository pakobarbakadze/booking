import { AbstractEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

@Entity('hotels')
export class Hotel extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];
}

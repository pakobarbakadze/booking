import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';
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
}

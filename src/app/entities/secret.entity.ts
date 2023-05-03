// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Secret extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;
}

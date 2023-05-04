import { DatabaseSession } from '@foal/typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  address: string;

  @Column({ nullable: true })
  signature: string;
  
  // @Column({ nullable: true })
  // name: string;
}

export { DatabaseSession }

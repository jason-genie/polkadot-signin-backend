import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  address: string;

  @Column({ nullable: true })
  signature: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;
  
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;
}

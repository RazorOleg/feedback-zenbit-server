import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('city')
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  img: string;

  @Column()
  title: string;

  @Column()
  price: string;

  @Column()
  ticket: string;

  @Column()
  yield: string;

  @Column()
  day: string;

  @Column()
  sold: string;
}

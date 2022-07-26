import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  Image: string;

  @Column({
    nullable: false,
  })
  Product_Id: string;
}

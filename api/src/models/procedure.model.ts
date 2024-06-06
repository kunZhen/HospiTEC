
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Procedure {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'int' })
  duration: number;
}

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Room {
    @PrimaryColumn()
    number: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'int' })
    capacity: number;

    @Column({ type: 'int' })
    floor: number;

    @Column({ type: 'varchar', length: 100 })
    roomTypeID: string;
}

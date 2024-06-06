import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Patient {
    @PrimaryColumn({ type: 'varchar', length: 20 })
    identification_number: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    fLastName: string;

    @Column({ type: 'varchar', length: 100 })
    sLastName: string;

    @Column({ type: 'date' })
    birthdate: Date;

    @Column({ type: 'varchar', length: 200 })
    address: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;

    @Column({ type: 'varchar', length: 100 })
    user: string;
}

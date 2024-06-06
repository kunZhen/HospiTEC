import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from 'src/models/rol.model';
@Entity()
export class Personal {
    @PrimaryColumn({ type: 'varchar', length: 20 })
    identificationnumber: string;

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

    @Column({ type: 'date' })
    hireDate: Date;

    @ManyToOne(() => Rol)
    @JoinColumn({ name: 'rolid' })
    role: Rol;
}

import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectConnection() private readonly connection: Connection,
      ) {}
    
      async insertPersonal(
        p_identificationnumber: string,
        p_name: string,
        p_flastname: string,
        p_slastname: string,
        p_birthdate: Date,
        p_address: string,
        p_email: string,
        p_password: string,
        p_hiredate: Date,
        p_rolid: number,
      ): Promise<void> {
        try {
          await this.connection.query(
            'CALL insert_personal($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            [p_identificationnumber, p_name, p_flastname, p_slastname, p_birthdate, p_address, p_email, p_password, p_hiredate, p_rolid]
          );
        } catch (error) {
          throw new Error(`Error al insertar el personal: ${error.message}`);
        }
      }
      async insertPatient(
        p_identificationnumber: string,
        p_name: string,
        p_birthdate: Date,
        p_address: string,
        p_email: string,
        p_password: string,
        p_flastname: string,
        p_slastname: string,
        p_user: string,
      ): Promise<void> {
        try {
          await this.connection.query(
            'CALL insert_patient($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [p_identificationnumber, p_name, p_birthdate, p_address, p_email, p_password, p_flastname, p_slastname, p_user]
          );
        } catch (error) {
          throw new Error(`Error al insertar el paciente: ${error.message}`);
        }
      }
}

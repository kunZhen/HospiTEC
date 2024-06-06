import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { DatabaseService } from 'src/service/database/database.service';

@Controller('database')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

  @Post('personal')
  async insertPersonal(
    @Body('identificationNumber') identificationNumber: string,
    @Body('name') name: string,
    @Body('fLastName') fLastName: string,
    @Body('sLastName') sLastName: string,
    @Body('birthdate') birthdate: Date,
    @Body('address') address: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('hiredate') hiredate: Date,
    @Body('rolid') rolid: number,
    ) {
    try {
      await this.databaseService.insertPersonal(
        identificationNumber,
        name,
        fLastName,
        sLastName,
        birthdate,
        address,
        email,
        password,
        hiredate,
        rolid,
      );
      return { message: 'Personal insertado correctamente' };
    } catch (error) {
      throw new HttpException('Error al insertar el personal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('patient')
    async insertPatient(
    @Body('identificationNumber') identificationNumber: string,
    @Body('name') name: string,
    @Body('birthdate') birthdate: Date,
    @Body('address') address: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('fLastName') fLastName: string,
    @Body('sLastName') sLastName: string,
    @Body('user') user: string,
    ) {
    try {
        await this.databaseService.insertPatient(
        identificationNumber,
        name,
        birthdate,
        address,
        email,
        password,
        fLastName,
        sLastName,
        user,
        );
        return { message: 'Paciente insertado correctamente' };
    } catch (error) {
        throw new HttpException('Error al insertar el paciente', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

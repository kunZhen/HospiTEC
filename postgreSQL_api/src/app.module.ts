import { Module } from '@nestjs/common';
import { AppController} from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './models/patient.model';
import { Room } from './models/room.model';
import { RoomService } from './service/room/room.service';
import { RoomController } from './controller/room/room.controller';
import { PatientService } from './service/patient/patient.service';
import { PatientController } from './controller/patient/patient.controller';
import { DatabaseService } from './service/database/database.service';
import { PersonalService } from './service/personal/personal.service';
import { PersonalController } from './controller/personal/personal.controller';
import { DatabaseController } from './controller/database/database.controller';
import { Personal } from './models/personal.model';
import { Rol } from './models/rol.model';
import { Procedure } from './models/procedure.model';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'hospitec.c5aukmwk0rbs.us-east-2.rds.amazonaws.com', // Dirección del host de tu RDS
      port: 5432,
      username: 'hospitec',
      password: '12345678',
      database: 'hospitec',
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [],
    }),
    TypeOrmModule.forFeature([Patient, Room, Rol, Personal, Procedure ]),
  ],
  controllers: [AppController, RoomController, PatientController, PersonalController, DatabaseController],
  providers: [AppService, RoomService, PatientService, DatabaseService, PersonalService],
})
export class AppModule {}

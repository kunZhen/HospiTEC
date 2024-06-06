import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { Patient } from 'src/models/patient.model';
import { PatientService } from 'src/service/patient/patient.service';

@Controller('patient')
export class PatientController {
    constructor(private  patientService: PatientService) {}
    @Get()
    findAll(): Promise<Patient[]> {
        return this.patientService.findAll();
    }
    @Post()
    create(@Body() patient: Patient): Promise<Patient> {
        return this.patientService.create(patient);
    }
    @Get('login/:email/:password')
    async login(@Param('email') email: string, @Param('password') password: string) {
        const patient = await this.patientService.findPatientByUserAndPassword(email, password);
        if (!patient) {
        return { message: 'Usuario o contraseña incorrectos' };
        }
        return patient;
    }
}

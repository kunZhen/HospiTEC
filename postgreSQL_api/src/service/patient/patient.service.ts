import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/models/patient.model';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
    ) {}

    async findAll():Promise<Patient[]>{
        return this.patientRepository.find()
        
    }

    async create(patient: Patient): Promise<Patient> {
        return this.patientRepository.save(patient);
    }

    async findPatientByUserAndPassword(email: string, password: string): Promise<Patient | null> {
        return await this.patientRepository.findOne({ where: { email, password } });
    }
    
}

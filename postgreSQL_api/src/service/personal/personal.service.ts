import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Personal } from 'src/models/personal.model';
import { Repository } from 'typeorm';

@Injectable()
export class PersonalService {
    constructor(
        @InjectRepository(Personal)
        private personalRepository: Repository<Personal>,
    ) {}

    async findAll():Promise<Personal[]>{
        return this.personalRepository.find()
        
    }

    async create(personal: Personal): Promise<Personal> {
        return this.personalRepository.save(personal);
    }

    async findPersonalByUserAndPassword(email: string, password: string): Promise<Personal | null> {
        return await this.personalRepository.findOne({ where: { email, password } });
    }
    
}
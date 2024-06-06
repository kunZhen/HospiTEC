import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from 'src/models/procedure.model';
import { Repository } from 'typeorm';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(Procedure)
    private procedureRepository: Repository<Procedure>,
  ) {}

  async findAll(): Promise<Procedure[]> {
    return await this.procedureRepository.find();
  }

  async findOne(name: string): Promise<Procedure> {
    return await this.procedureRepository.findOne({ where: { name } });
  }

  async create(procedureData: Partial<Procedure>): Promise<Procedure> {
    const procedure = this.procedureRepository.create(procedureData);
    return await this.procedureRepository.save(procedure);
  }

  async update(name: string, procedureData: Partial<Procedure>): Promise<Procedure> {
    await this.procedureRepository.update({ name }, procedureData);
    return this.findOne(name);
  }

  async remove(name: string): Promise<void> {
    await this.procedureRepository.delete({ name });
  }
}

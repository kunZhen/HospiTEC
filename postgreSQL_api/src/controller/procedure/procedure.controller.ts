import { Body, Controller, Get, Param, Post, Put, Delete} from '@nestjs/common';
import { Procedure } from 'src/models/procedure.model';
import { ProcedureService } from 'src/service/procedure/procedure.service';

@Controller('procedure')
export class ProcedureController {
    constructor(private procedureService: ProcedureService) {}

    @Get()
    async findAll(): Promise<Procedure[]> {
      return this.procedureService.findAll();
    }
  
    @Get(':name')
    async findOne(@Param('name') name: string): Promise<Procedure> {
      return this.procedureService.findOne(name);
    }
  
    @Post()
    async create(@Body() procedureData: Partial<Procedure>): Promise<Procedure> {
      return this.procedureService.create(procedureData);
    }
  
    @Put(':name')
    async update(@Param('name') name: string, @Body() procedureData: Partial<Procedure>): Promise<Procedure> {
      return this.procedureService.update(name, procedureData);
    }
  
    @Delete(':name')
    async remove(@Param('name') name: string): Promise<void> {
      return this.procedureService.remove(name);
    }

}

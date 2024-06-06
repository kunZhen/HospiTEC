import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { Personal } from 'src/models/personal.model';
import { PersonalService } from 'src/service/personal/personal.service';

@Controller('personal')
export class PersonalController {
    constructor(private  personalService: PersonalService) {}
    @Get()
    findAll(): Promise<Personal[]> {
        return this.personalService.findAll();
    }
    @Post()
    create(@Body() personal: Personal): Promise<Personal> {
        return this.personalService.create(personal);
    }
    @Get('login/:email/:password')
    async login(@Param('email') email: string, @Param('password') password: string) {
        const personal = await this.personalService.findPersonalByUserAndPassword(email, password);
        if (!personal) {
        return { message: 'Usuario o contraseña incorrectos' };
        }
        return personal;
    }
}
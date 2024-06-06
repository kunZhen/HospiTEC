import { Controller, Get, Post, Body } from '@nestjs/common';
import { Room } from 'src/models/room.model';
import { RoomService } from 'src/service/room/room.service';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    findAll(): Promise<Room[]> {
        return this.roomService.findAll();
    }
    @Post()
    create(@Body() room: Room): Promise<Room> {
        return this.roomService.create(room);
    }
}

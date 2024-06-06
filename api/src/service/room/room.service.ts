import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/models/room.model';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private roomRepository: Repository<Room>,
    ) {}

    findAll(): Promise<Room[]> {
        return this.roomRepository.find();
    }
    create(room: Room): Promise<Room> {
        return this.roomRepository.save(room);
    }
    
}

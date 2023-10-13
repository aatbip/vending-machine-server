import { Injectable } from '@nestjs/common';
import { CreateCoreDto } from './dto/create-core.dto';

@Injectable()
export class CoreService {
  create(createCoreDto: CreateCoreDto) {
    return 'This action adds a new core';
  }

  findAll() {
    return `This action returns all core`;
  }

  findOne(id: number) {
    return `This action returns a #${id} core`;
  }

  remove(id: number) {
    return `This action removes a #${id} core`;
  }
}

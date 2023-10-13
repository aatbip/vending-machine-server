import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IConfig, IState } from 'types/interfaces';
import { CoreService } from './core.service';
import { CreateCoreDto } from './dto/create-core.dto';

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) { }

  @Post()
  create(@Body() createCoreDto: CreateCoreDto) {
    return this.coreService.create(createCoreDto);
  }

  @Get("initial-state")
  getInitialState(): { state: IState, config: IConfig } {
    return this.coreService.getInitialState();
  }

}

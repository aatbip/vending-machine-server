import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IConfig, IState } from 'types/interfaces';
import { CoreService } from './core.service';
import { PurchaseDto } from './dto/purchase.dto';

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) { }

  @Post('purchase')
  async purchase(@Body() purchaseDto: PurchaseDto) {
    return await this.coreService.purchase(purchaseDto);
  }

  @Get("initial-state")
  async getInitialState(): Promise<{ state: IState, config: IConfig }> {
    return await this.coreService.getInitialState();
  }
}

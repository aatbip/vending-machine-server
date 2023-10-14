import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, NotFoundException, HttpException } from '@nestjs/common';
import { NotFoundExceptionFilter } from 'src/common/filters/not-found.exception';
import { IConfig, IState } from 'types/interfaces';
import { CoreService } from './core.service';
import { PurchaseDto } from './dto/purchase.dto';

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) { }

  @Get("initial-state")
  @UseFilters(NotFoundExceptionFilter)
  async getInitialState(): Promise<{ state: IState, config: IConfig }> {
    try {
      return await this.coreService.getInitialState();
    } catch (e) {
      throw new NotFoundException("File Not Found!", { cause: e.message })
    }
  }

  @Post('purchase')
  async purchase(@Body() purchaseDto: PurchaseDto) {
    return await this.coreService.purchase(purchaseDto);
  }

}

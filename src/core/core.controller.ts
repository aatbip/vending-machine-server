import { Controller, Get, Post, Body, UseFilters, NotFoundException, HttpException, UsePipes } from '@nestjs/common';
import { NotFoundExceptionFilter } from 'src/common/filters/not-found.exception';
import { ValidateCostPipe } from 'src/common/pipes/validate-cost.pipe';
import { IConfig, IState, IValidateCostResponse } from 'types/interfaces';
import { CoreService } from './core.service';

@Controller('core')
@UseFilters(NotFoundExceptionFilter)
export class CoreController {
  constructor(private readonly coreService: CoreService) { }

  @Get("initial-state")
  async getInitialState(): Promise<{ state: IState, config: IConfig }> {
    try {
      return await this.coreService.getInitialState();
    } catch (e) {
      throw new NotFoundException("File Not Found!", { cause: e.message })
    }
  }

  @Post('purchase')
  @UsePipes(new ValidateCostPipe())
  async purchase(@Body() validateCostResponse: IValidateCostResponse) {
    try {
      const { purchaseDto, totalCost, totalInputMoney } = validateCostResponse;
      return await this.coreService.purchase(purchaseDto, totalCost, totalInputMoney);
    } catch (e) {
      throw new NotFoundException("File Not Found!", { cause: e.message })
    }
  }

}

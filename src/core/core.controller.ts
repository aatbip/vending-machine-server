import { Controller, Get, Post, Body, UseFilters, NotFoundException, HttpException, UsePipes } from '@nestjs/common';
import { NotFoundExceptionFilter } from 'src/common/filters/not-found.exception';
import { ValidatePurchasePipe } from 'src/common/pipes/validate-purchase.pipe';
import { IConfig, IState, IValidatePurchaseResponse } from 'types/interfaces';
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
      throw new NotFoundException("State Files Not Found!", { cause: e.message })
    }
  }

  @Post('purchase')
  @UsePipes(new ValidatePurchasePipe())
  async purchase(@Body() validatePurchaseResponse: IValidatePurchaseResponse) {
    try {
      const { purchaseDto, totalCost, totalInputMoney } = validatePurchaseResponse;
      return await this.coreService.purchase(purchaseDto, totalCost, totalInputMoney);
    } catch (e) {
      throw new NotFoundException("State Files Not Found!", { cause: e.message })
    }
  }
}

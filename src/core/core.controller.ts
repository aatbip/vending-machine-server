import { Controller, Get, Post, Body, UseFilters, NotFoundException, HttpException, UsePipes } from '@nestjs/common';
import { NotFoundExceptionFilter } from 'src/common/filters/not-found.exception';
import { ValidatePurchasePipe } from 'src/common/pipes/validate-purchase.pipe';
import { ValidateRefundPipe } from 'src/common/pipes/validate-refund.pipe';
import { FileSystemApiService } from 'src/fileSystemApi/fileSystemApi.service';
import { IConfig, IState, IValidatePurchaseResponse, IValidateRefundResponse } from 'types/interfaces';
import { CoreService } from './core.service';

@Controller('core')
@UseFilters(NotFoundExceptionFilter)
export class CoreController {

  constructor(private readonly coreService: CoreService) { }

  @Get("initial-state")
  async getCurrentState(): Promise<{ state: IState, config: IConfig }> {
    try {
      return await this.coreService.getCurrentState();
    } catch (e) {
      throw new NotFoundException("State Files Not Found!", { cause: e.message })
    }
  }

  @Post('purchase')
  @UsePipes(new ValidatePurchasePipe(new FileSystemApiService()))
  async purchase(@Body() validatePurchaseResponse: IValidatePurchaseResponse):
    Promise<{ updatedState: IState, change: number }> {
    try {
      const { purchaseDto, totalCost, totalInputMoney } = validatePurchaseResponse;
      return await this.coreService.purchase(purchaseDto, totalCost, totalInputMoney);
    } catch (e) {
      throw new NotFoundException("State Files Not Found!", { cause: e.message })
    }
  }

  @Post('refund')
  @UsePipes(new ValidateRefundPipe(new FileSystemApiService()))
  async refund(@Body() validateRefundResponse: IValidateRefundResponse):
    Promise<{ updatedState: IState; refund: number; }> {
    const { refundDto, totalCost } = validateRefundResponse;
    try {
      return await this.coreService.refund(refundDto, totalCost)
    } catch (e) {
      throw new NotFoundException("State Files Not Found!", { cause: e.message })
    }
  }
}

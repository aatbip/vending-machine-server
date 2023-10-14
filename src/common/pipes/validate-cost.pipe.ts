import { PipeTransform, Injectable, ArgumentMetadata, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { PurchaseDto } from 'src/core/dto/purchase.dto';
import * as config from "../../../state/config.json";

@Injectable()
export class ValidateCostPipe implements PipeTransform {
  transform(purchaseDto: PurchaseDto, metadata: ArgumentMetadata) {
    const totalCost = purchaseDto.coke_count * config.coke_price
      + purchaseDto.dew_count * config.dew_price
      + purchaseDto.pepsi_count * config.pepsi_price;

    const totalInputMoney = purchaseDto.cash_count + purchaseDto.coin_count;

    if (totalInputMoney < totalCost) {
      throw new UnauthorizedException("Input cash/coin is less than the cost!")
    }

    return { purchaseDto, totalCost, totalInputMoney }
  }
}

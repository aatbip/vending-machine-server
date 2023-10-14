import { PipeTransform, Injectable, UnauthorizedException } from '@nestjs/common';
import { PurchaseDto } from 'src/core/dto/purchase.dto';
import { FileSystemApiService } from 'src/fileSystemApi/fileSystemApi.service';
import * as config from "../../../state/config.json";
import * as path from 'node:path';

@Injectable()
export class ValidatePurchasePipe implements PipeTransform {

  private stateFilePath: string;

  constructor(private readonly fileSystemApiService: FileSystemApiService) {
    this.stateFilePath = path.resolve(__dirname, "../../../state/state.json");
  }

  async transform(purchaseDto: PurchaseDto, _: any) {

    const state = await this.fileSystemApiService.readFile(this.stateFilePath)


    if (state.pepsi_count < purchaseDto.pepsi_count) {
      throw new UnauthorizedException(`Sorry, ${state.pepsi_count} pepsi available!`)
    } else if (state.dew_count < purchaseDto.dew_count) {
      throw new UnauthorizedException(`Sorry, ${state.dew_count} dew available!`)
    } else if (state.coke_count < purchaseDto.coke_count) {
      throw new UnauthorizedException(`Sorry, ${state.coke_count} coke available!`)
    }


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

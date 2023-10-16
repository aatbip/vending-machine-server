import { Injectable } from '@nestjs/common';
import * as config from "../../state/config.json";
import { IConfig, IState } from 'types/interfaces';
import { PurchaseDto } from './dto/purchase.dto';
import * as path from 'node:path';
import { RefundDto } from './dto/refund.dto';
// import { FileSystemApiService } from 'src/fileSystemApi/fileSystemApi.service';
import { FileSystemApiService } from "./../../src/fileSystemApi/fileSystemApi.service"

@Injectable()
export class CoreService {

  private stateFilePath: string;


  constructor(private readonly fileSystemApiService: FileSystemApiService) {
    this.stateFilePath = path.resolve(__dirname, "../../state/state.json");
  }

  async getCurrentState(): Promise<{ state: IState, config: IConfig }> {
    const state = await this.fileSystemApiService.readFile(this.stateFilePath);

    return { state, config }
  }

  async purchase(purchaseDto: PurchaseDto, totalCost: number, totalInputMoney: number):
    Promise<{ updatedState: IState, change: number }> {

    const state = await this.fileSystemApiService.readFile(this.stateFilePath);

    let change = totalInputMoney - totalCost

    let updatedState: IState | undefined = undefined;

    if (state.coins_count === state.cash_count) {
      updatedState = {
        coke_count: state.coke_count - purchaseDto.coke_count,
        pepsi_count: state.pepsi_count - purchaseDto.pepsi_count,
        dew_count: state.dew_count - purchaseDto.dew_count,
        coins_count: state.coins_count + purchaseDto.coin_count - change,
        cash_count: state.cash_count + purchaseDto.cash_count
      }
    } else {
      updatedState = {
        coke_count: state.coke_count - purchaseDto.coke_count,
        pepsi_count: state.pepsi_count - purchaseDto.pepsi_count,
        dew_count: state.dew_count - purchaseDto.dew_count,
        coins_count: state.coins_count + purchaseDto.coin_count - (state.coins_count > state.cash_count ? change : 0),
        cash_count: state.cash_count + purchaseDto.cash_count - (state.cash_count > state.coins_count ? change : 0)
      }
    }

    await this.fileSystemApiService.writeFile(this.stateFilePath, JSON.stringify(updatedState))


    return {
      updatedState,
      change
    };
  }

  async refund(refundDto: RefundDto, totalCost: number):
    Promise<{ updatedState: IState; refund: number; }> {

    const state = await this.fileSystemApiService.readFile(this.stateFilePath);

    const updatedState: IState = {
      coke_count: state.coke_count + refundDto.coke_count,
      pepsi_count: state.pepsi_count + refundDto.pepsi_count,
      dew_count: state.dew_count + refundDto.dew_count,
      coins_count: state.coins_count - (state.coins_count > state.cash_count ? totalCost : 0),
      cash_count: state.cash_count - (state.cash_count > state.coins_count ? totalCost : 0)
    }

    await this.fileSystemApiService.writeFile(this.stateFilePath, JSON.stringify(updatedState))

    return {
      updatedState,
      refund: totalCost
    }

  }
}









































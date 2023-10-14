import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import * as config from "../../state/config.json";
import { IConfig, IState } from 'types/interfaces';
import { PurchaseDto } from './dto/purchase.dto';
import * as fs from "node:fs/promises"
import * as path from 'node:path';

@Injectable()
export class CoreService {

  private stateFilePath: string;

  constructor() {
    this.stateFilePath = path.resolve(__dirname, "../../state/state.json");
  }

  async getInitialState(): Promise<{ state: IState, config: IConfig }> {
    const state = await this.readStateFile()

    return { state, config }
  }

  async purchase(purchaseDto: PurchaseDto, totalCost: number, totalInputMoney: number) {

    const state = await this.readStateFile()

    let change = purchaseDto.cash_count + purchaseDto.coin_count - totalCost

    const updatedState: IState = {
      coke_count: state.coke_count - purchaseDto.coke_count,
      pepsi_count: state.pepsi_count - purchaseDto.pepsi_count,
      dew_count: state.dew_count - purchaseDto.dew_count,
      coins_count: state.coins_count + purchaseDto.coin_count - change, //assuming change is always returned in coins.
      cash_count: state.cash_count + purchaseDto.cash_count
    }

    await fs.writeFile(this.stateFilePath, JSON.stringify(updatedState))

    return {
      updatedState,
      change
    };
  }

  async readStateFile(): Promise<IState> {
    return JSON.parse(await fs.readFile(this.stateFilePath, 'utf-8'));
  }
}









































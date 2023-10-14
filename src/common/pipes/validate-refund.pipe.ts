import { PipeTransform, Injectable, ForbiddenException } from '@nestjs/common';
import { Capacity } from 'src/constants/constants';
import { RefundDto } from 'src/core/dto/refund.dto';
import { FileSystemApiService } from 'src/fileSystemApi/fileSystemApi.service';
import * as config from "../../../state/config.json";
import * as path from 'node:path';

@Injectable()
export class ValidateRefundPipe implements PipeTransform {

  private stateFilePath: string;

  constructor(private readonly fileSystemApiService: FileSystemApiService) {
    this.stateFilePath = path.resolve(__dirname, "../../../state/state.json");
  }

  async transform(refundDto: RefundDto, _: any) {

    const state = await this.fileSystemApiService.readFile(this.stateFilePath)

    const CAPACITY = Capacity.ITEM_CAPACITY;

    if (state.coke_count + refundDto.coke_count > CAPACITY) {
      throw new ForbiddenException(`Only ${CAPACITY - state.coke_count} coke can be refunded!`)
    } else if (state.pepsi_count + refundDto.pepsi_count > CAPACITY) {
      throw new ForbiddenException(`Only ${CAPACITY - state.pepsi_count} pepsi can be refunded!`)
    } else if (state.dew_count + refundDto.dew_count > CAPACITY) {
      throw new ForbiddenException(`Only ${CAPACITY - state.dew_count} dew can be refunded!`)
    }

    const totalCost = refundDto.coke_count * config.coke_price
      + refundDto.dew_count * config.dew_price
      + refundDto.pepsi_count * config.pepsi_price;

    return {
      refundDto,
      totalCost
    }
  }
}

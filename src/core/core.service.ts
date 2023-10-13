import { Injectable } from '@nestjs/common';
import { CreateCoreDto } from './dto/create-core.dto';
import * as state from "../../state/state.json";
import * as config from "../../state/config.json";
import { IConfig, IState } from 'types/interfaces';

@Injectable()
export class CoreService {

  getInitialState(): { state: IState, config: IConfig } {
    return { state, config }
  }

  create(createCoreDto: CreateCoreDto) {
    return 'This action adds a new core';
  }

}

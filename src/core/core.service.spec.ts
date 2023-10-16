import { Test, TestingModule } from '@nestjs/testing';
import { CoreService } from './core.service';
import { FileSystemApiService } from '../../src/fileSystemApi/fileSystemApi.service';
import { PurchaseDto } from './dto/purchase.dto';
import { RefundDto } from './dto/refund.dto';
import * as path from 'path';
import * as fs from 'fs';
import * as config from "../../state/config.json"

jest.mock('../../src/fileSystemApi/fileSystemApi.service');

describe('CoreService', () => {
  let service: CoreService;
  let fileSystemApiService: FileSystemApiService;

  const mockFilePath = path.resolve(__dirname, '../../state/state_test.json');

  const mockState = {
    coke_count: 10,
    pepsi_count: 10,
    dew_count: 10,
    coins_count: 100,
    cash_count: 200,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreService, FileSystemApiService],
    }).compile();

    service = module.get<CoreService>(CoreService);
    fileSystemApiService = module.get<FileSystemApiService>(FileSystemApiService);

    // Mock the readFile method of FileSystemApiService
    jest.spyOn(fileSystemApiService, 'readFile').mockImplementation(() => {
      return Promise.resolve(mockState);
    });

    // Mock the writeFile method of FileSystemApiService
    jest.spyOn(fileSystemApiService, 'writeFile').mockImplementation(() => {
      return Promise.resolve();
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrentState', () => {
    it('should return current state and config', async () => {
      const result = await service.getCurrentState();
      expect(result.state).toEqual(mockState);
      // Assuming config is imported from the provided config.json
      expect(result.config).toEqual(config);
    });
  });

  describe('purchase', () => {
    it('should update state and return change', async () => {
      const purchaseDto: PurchaseDto = {
        coke_count: 1,
        pepsi_count: 2,
        dew_count: 3,
        coin_count: 1,
        cash_count: 5,
      };

      const totalCost = 5; // Assume some value
      const totalInputMoney = 10; // Assume some value

      const result = await service.purchase(purchaseDto, totalCost, totalInputMoney);

      expect(result.updatedState).toEqual({
        coke_count: mockState.coke_count - purchaseDto.coke_count,
        pepsi_count: mockState.pepsi_count - purchaseDto.pepsi_count,
        dew_count: mockState.dew_count - purchaseDto.dew_count,
        coins_count: mockState.coins_count + purchaseDto.coin_count - (purchaseDto.coin_count > purchaseDto.cash_count ? totalInputMoney - totalCost : 0),
        cash_count: mockState.cash_count + purchaseDto.cash_count - (purchaseDto.cash_count > purchaseDto.coin_count ? totalInputMoney - totalCost : 0)
      });

      expect(result.change).toEqual(totalInputMoney - totalCost);
    });
  });

  describe('refund', () => {
    it('should update state and return refund if available', async () => {
      const refundDto: RefundDto = {
        coke_count: 1,
        pepsi_count: 0,
        dew_count: 0,
      };

      const totalCost = 20;

      const result = await service.refund(refundDto, totalCost);

      expect(result.refund).toEqual(20);
    });
  });

  afterAll(() => {
    // Clean up the mocked state file
    if (fs.existsSync(mockFilePath)) {
      fs.unlinkSync(mockFilePath);
    }
  });
});



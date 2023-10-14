import { PurchaseDto } from "src/core/dto/purchase.dto";
import { RefundDto } from "src/core/dto/refund.dto";

export interface IState {
  coke_count: number;
  pepsi_count: number;
  dew_count: number;
  coins_count: number;
  cash_count: number;
}

export interface IConfig {
  coke_price: number;
  pepsi_price: number;
  dew_price: number;
}

export interface IValidatePurchaseResponse {
  purchaseDto: PurchaseDto;
  totalCost: number;
  totalInputMoney: number;
}

export interface IValidateRefundResponse {
  refundDto: RefundDto;
  totalCost: number;
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Web3Service} from './web3.service';
import { DepositoryService } from '../services/depository/depository.service';
import { AssetService } from '../services/asset/asset.service';
import { OrderService } from '../services/order/order.service';
import { MatchService } from '../services/match/match.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    Web3Service,
    DepositoryService,
    AssetService,
    OrderService,
    MatchService
  ],
  declarations: []
})
export class UtilModule {
}

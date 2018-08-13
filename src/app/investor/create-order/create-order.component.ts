import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { DepositoryService } from '../../services/depository/depository.service';
import { AssetService } from '../../services/asset/asset.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  orderService: OrderService;
  depositoryService: DepositoryService;
  assetService: AssetService;
  assetEvents: any;
  ownershipEvents: any;
  owner: any;
  ownersAsset: any;
  depositoryContract: any;
  newOrder: any;

  constructor(orderService: OrderService, depositoryService: DepositoryService, assetService: AssetService) {
    this.orderService = orderService;
    this.depositoryService = depositoryService;
    this.assetService = assetService;
    this.assetEvents = null;
    this.ownershipEvents = null;
    this.depositoryContract = null;
    this.newOrder = {
      owner: null,
      assetId: null,
      depositoryAddress: null,
      intent: null,
      broker: null,
      claim: null,
      ownerSignature: null
    }
  }

  ngOnInit() {
    this.depositoryContract = this.depositoryService.depositoryContract;
    this.assetEvents = this.assetService.assetEvents;
    this.ownershipEvents = this.depositoryService.ownershipEvents;
  }

  selectedOwner(value: any) {
    if (value == "") {
      alert("Please select a owner")
    }
    else {
      this.owner = value;
      this.ownersAsset = this.getAssetsOfOwner(this.owner);
    }
  }

  getAssetsOfOwner(owner) {
    var assets = [];
    for (var ownership of this.depositoryService.ownershipEvents) {
      if (ownership.args.owner == owner) {
        assets.push(ownership.args.assetId);
      }
    }
    return assets;
  }

  getOwnerships() {
  }

}

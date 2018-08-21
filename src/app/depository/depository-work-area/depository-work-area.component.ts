import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepositoryService } from '../../services/depository/depository.service';
import { AssetService } from '../../services/asset/asset.service';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-depository-work-area',
  templateUrl: './depository-work-area.component.html',
  styleUrls: ['./depository-work-area.component.css']
})

export class DepositoryWorkAreaComponent implements OnInit {

  property1: boolean;
  property2: boolean;
  property3: boolean;
  property4: boolean;
  depositoryService: DepositoryService;
  assetService: AssetService;
  orderService: OrderService;

  constructor(router: Router, depositoryService: DepositoryService, assetService: AssetService, orderService: OrderService) {
    this.property1 = true;
    this.property2 = false;
    this.property3 = false;
    this.property4 = false;
    router.navigateByUrl("/depositoryWorkArea/createOwnership");
    this.depositoryService = depositoryService;
    this.assetService = assetService;
    this.orderService = orderService;
  }

  ngOnInit() {
    
  }

  addAsset() {
    this.property1 = true;
    this.property2 = false;
    this.property3 = false;
    this.property4 = false;
    this.initialize();
  }

  transferOwnership() {
    this.property1 = false;
    this.property2 = true;
    this.property3 = false;
    this.property4 = false;
    this.initialize();
  }

  viewAssets() {
    this.property1 = false;
    this.property2 = false;
    this.property3 = true;
    this.property4 = false;
    this.initialize();
  }

  viewOwnerships() {
    this.property1 = false;
    this.property2 = false;
    this.property3 = false;
    this.property4 = true;
    this.initialize();
  }

  initialize() {
    this.depositoryService.getDepositoryCreatedEvents();
    this.assetService.getAllAssetCreatedEvents();
    this.depositoryService.getOwnershipCreatedEvents();
    // this.assetService.ownerUpdatedEvents();
    this.orderService.getAllOrderCreatedEvents();
  }

}

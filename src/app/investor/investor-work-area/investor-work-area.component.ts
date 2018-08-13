import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepositoryService } from '../../services/depository/depository.service';
import { AssetService } from '../../services/asset/asset.service';

@Component({
  selector: 'app-investor-work-area',
  templateUrl: './investor-work-area.component.html',
  styleUrls: ['./investor-work-area.component.css']
})
export class InvestorWorkAreaComponent implements OnInit {

  property1: boolean;
  property2: boolean;
  property3: boolean;
  property4: boolean;
  depositoryService: DepositoryService;
  assetService: AssetService;

  constructor(router: Router, depositoryService: DepositoryService, assetService: AssetService) {
    this.property1 = true;
    this.property2 = false;
    this.property3 = false;
    this.property4 = false;
    router.navigateByUrl("investorWorkArea/addAsset");
    this.depositoryService = depositoryService;
    this.assetService = assetService;
   }

  ngOnInit() {
  }

  createAsset() {
    this.property1 = true;
    this.property2 = false;
    this.property3 = false;
    this.property4 = false;
    this.initialize();
  }

  authorizeBroker() {
    this.property1 = false;
    this.property2 = true;
    this.property3 = false;
    this.property4 = false;
    this.initialize();
  }

  exchangePending() {
    this.property1 = false;
    this.property2 = false;
    this.property3 = true;
    this.property4 = false;
    this.initialize();
  }

  createOrder() {
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
    this.assetService.getOwnershipUpdatedEvents();
  }

}

import { Component, OnInit } from '@angular/core';
import { AssetService } from './services/asset/asset.service';
import { DepositoryService } from './services/depository/depository.service';
import { Router } from '@angular/router';
import { OrderService } from './services/order/order.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  assetService: AssetService;
  depositoryService: DepositoryService;
  orderService: OrderService;

  constructor(assetService: AssetService, depositoryService: DepositoryService, orderService: OrderService, router: Router) {
    this.assetService = assetService;
    this.depositoryService = depositoryService;
    this.orderService = orderService;
    router.navigateByUrl("match");
  }

  ngOnInit() {
  }

  initialize() {
    this.depositoryService.getDepositoryCreatedEvents();
    this.assetService.getAllAssetCreatedEvents();
    this.depositoryService.getOwnershipCreatedEvents();
    this.assetService.getOwnershipUpdatedEvents();
    this.orderService.getAllOrderCreatedEvents();
  }
  
}

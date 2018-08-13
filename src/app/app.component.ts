import { Component, OnInit } from '@angular/core';
import { AssetService } from './services/asset/asset.service';
import { DepositoryService } from './services/depository/depository.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  assetService: AssetService;
  depositoryService: DepositoryService;

  constructor(assetService: AssetService, depositoryService: DepositoryService, router: Router) {
    this.assetService = assetService;
    this.depositoryService = depositoryService;
    router.navigateByUrl("match");
  }

  ngOnInit() {
  }

  initialize() {
    this.depositoryService.getDepositoryCreatedEvents();
    this.assetService.getAllAssetCreatedEvents();
    this.depositoryService.getOwnershipCreatedEvents();
    this.assetService.getOwnershipUpdatedEvents();
  }
  
}

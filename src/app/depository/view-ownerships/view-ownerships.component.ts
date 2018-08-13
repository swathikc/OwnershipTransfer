import { Component, OnInit } from '@angular/core';
import { DepositoryService } from '../../services/depository/depository.service';
import { AssetService } from '../../services/asset/asset.service';

@Component({
  selector: 'app-view-ownerships',
  templateUrl: './view-ownerships.component.html',
  styleUrls: ['./view-ownerships.component.css']
})
export class ViewOwnershipsComponent implements OnInit {

  ownershipEvents: any;
  assetService: AssetService;
  depositoryService: DepositoryService;

  constructor(assetService: AssetService, depositoryService: DepositoryService) { 
    this.depositoryService = depositoryService;
    this.assetService = assetService;
    this.ownershipEvents = [];
    this.getAllOwnerships();
  }

  ngOnInit() {
    this.depositoryService.getOwnershipCreatedEvents();
  }
  
  getAllOwnerships() {
    this.ownershipEvents = this.depositoryService.ownershipEvents;
    console.log(this.ownershipEvents);
  }

  getOwnership(ownershipId) {
    this.depositoryService.getOwnershipById(ownershipId);
  }

  getAsset(assetId) {
    this.assetService.getAssetById(assetId);
  }

}

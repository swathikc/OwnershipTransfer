import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset/asset.service';
import { DepositoryService } from '../../services/depository/depository.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {

  newAsset: any;
  Asset: any;
  assetService: AssetService;
  depositoryService: DepositoryService;
  depositoryContract: any;
  assetEvents: any;


  constructor(assetService: AssetService, depositoryService: DepositoryService) { 
    this.newAsset = {
      assetName: null,
      assetDescription: null,
      depositoryContract: null
    }
    this.assetService = assetService;
    this.depositoryService = depositoryService;
    this.depositoryContract = [];
    this.assetEvents = [];
  }

  ngOnInit() {
    this.assetEvents = this.assetService.assetEvents;
    this.depositoryContract = this.depositoryService.depositoryContract;
  }

  createAsset(event, addAssetForm) {
    event.preventDefault();
    if (!addAssetForm.valid) {
      alert('Invalid Data!');
      return;
    }
    console.log(this.newAsset);
    var assetName = this.newAsset.assetName;
    var assetDescription = this.newAsset.assetDescription;
    var depositoryContract = this.newAsset.depositoryContract;

    this.assetService.createAsset(assetName, assetDescription, depositoryContract);
  }

  getAllAssetCreatedEvents() {
    this.assetEvents = this.assetService.assetEvents;
  }

}

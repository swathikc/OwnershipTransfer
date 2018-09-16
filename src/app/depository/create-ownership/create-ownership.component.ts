import { Component, OnInit } from '@angular/core';
import { DepositoryService } from '../../services/depository/depository.service';
import { AssetService } from '../../services/asset/asset.service';

@Component({
  selector: 'app-create-ownership',
  templateUrl: './create-ownership.component.html',
  styleUrls: ['./create-ownership.component.css']
})
export class CreateOwnershipComponent implements OnInit {

  newOwnership: any;
  depositoryService: DepositoryService;
  assetService: AssetService;
  ownerEvents: any;
  ownership: any;
  assetId: any;
  assetEvents: any;
  newAssets: any;
  asset: any;

  constructor(depositoryService: DepositoryService, assetService: AssetService) {
    this.newOwnership = {
      assetId: null,
      assetAddress: null,
      owner: null
    }
    this.depositoryService = depositoryService;
    this.assetService = assetService;
    this.ownerEvents = [];
    this.asset = null;
    this.newAssets = [];
    this.getAllAssets();
    this.getNewAssets();
  }

  ngOnInit() {
    this.assetService.getAllAssetCreatedEvents();
    this.depositoryService.getOwnershipCreatedEvents();
    this.getAllAssets();
    this.getNewAssets();
  }

  createOwnership(event, createOwnershipForm) {
    event.preventDefault();
    if (!createOwnershipForm.valid) {
      alert('Invalid Data!');
      return;
    }
    console.log(this.newOwnership);
    var assetId = this.newOwnership.assetId;
    var assetAddress = this.newOwnership.assetAddress;
    var owner = this.newOwnership.owner;

    this.depositoryService.createFirstOwnership(owner, assetId, assetAddress);
    this.depositoryService.getOwnershipCreatedEvents();
    this.newOwnership.assetId = "";
    this.newOwnership.assetAddress = "";
    this.newOwnership.owner = "";
    this.getNewAssets();

  }

  updateAssetContract(event, updateAssetContractForm) {
    event.preventDefault();
    if (!updateAssetContractForm.valid) {
      alert('Invalid Data!');
      return;
    }

  }

  checkOwnerUpdatedEvent() {
    this.assetService.getOwnerUpdatedEvents();
    this.ownerEvents = this.assetService.ownerUpdatedEvents;
    console.log("OwnerUpdated Events: " + JSON.stringify(this.ownerEvents));
  }

  getAllAssets() {
    this.assetEvents = this.assetService.assetEvents;
    console.log(this.assetEvents);
  }

  getAssetDetails(assetId) {
    // alert(assetId);
    console.log(this.assetEvents);
    console.log(this.assetEvents[0]);
    var asset = null;
    for (var i = 0; i < this.assetEvents.length; i++) {
      asset = this.assetEvents[i];
      if (asset["args"]["id"] == assetId) {
        this.newOwnership.assetAddress = asset["address"];
        this.newOwnership.owner = asset["args"]["owner"];
      }
    }
  }

  //function to get the assetId's for which the ownership is not already created
  getNewAssets() {
    console.log("Inside getNewAssets function");
    var allAssets = this.assetEvents;
    var ownershipEvents = this.depositoryService.ownershipEvents;

    this.newAssets = [];
    // asset loop
    for (var i = 0; i < this.assetEvents.length; i++) {
      let assetId = this.assetEvents[i].args.id;
      var ownershipExists = false;
      // ownership loop
      for (var j = 0; j < ownershipEvents.length; j++) {
        let ownershipAssetId = ownershipEvents[j].args.assetId;
        if (assetId == ownershipAssetId) {
          ownershipExists = true;
        }
      }
      if (!ownershipExists) {
        this.newAssets.push(assetId);
      }
    }
  }

}


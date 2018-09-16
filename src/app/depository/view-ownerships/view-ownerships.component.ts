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
  ownership: any;
  asset: any;

  constructor(assetService: AssetService, depositoryService: DepositoryService) {
    this.depositoryService = depositoryService;
    this.assetService = assetService;
    this.ownershipEvents = [];
    this.getAllOwnerships();
    this.ownership = {
      ownershipId: null,
      assetId: null,
      previousOwnershipId: null,
      owner: null,
      depository: null
    }
    this.asset = {
      id: null,
      name: null,
      description: null,
      ownershipId: null,
      depository: null
    }
  }

  ngOnInit() {
    this.depositoryService.getOwnershipCreatedEvents();
  }

  getAllOwnerships() {
    this.ownershipEvents = this.depositoryService.ownershipEvents;
    console.log(this.ownershipEvents);
  }

  getOwnership(ownership_id) {

    this.depositoryService.getOwnershipById(ownership_id).then(ownership => {
      console.log("Ownership: " + ownership);
      var ownershipAfterSplit = ownership.toString().split(",");
      console.log("ownershipAfterSplit: " + ownershipAfterSplit);
      var ownershipId = ownershipAfterSplit[0];
      var owner = ownershipAfterSplit[1];
      var previousOwnershipId = ownershipAfterSplit[2];
      var assetId = ownershipAfterSplit[3];
      var depository = ownershipAfterSplit[4];
      this.ownership.ownershipId = ownershipId;
      this.ownership.owner = owner;
      this.ownership.previousOwnershipId = previousOwnershipId;
      this.ownership.assetId = assetId;
      this.ownership.depository = depository;
    })
  }

  getAsset(assetId) {
    this.assetService.getAssetById(assetId).then(asset => {
      console.log("Asset: "+asset);
      var assetAfterSplit = asset.toString().split(",");
      console.log("assetAfterSplit: " + assetAfterSplit);
      var id = assetAfterSplit[0];
      var name = assetAfterSplit[1];
      var description = assetAfterSplit[2];
      var ownershipId = assetAfterSplit[3];
      var depository = assetAfterSplit[4];
      this.asset.id = id;
      this.asset.name = name;
      this.asset.description = description;
      this.asset.ownershipId = ownershipId;
      this.asset.depository = depository;
    })
  }

  getDate(time) {
    time = new Date().getTime();
    var date = new Date(time);
     return date.toString().substring(0,25); // Wed Jan 12 2011 12:42:46 GMT-0800 (PST)
  }

  shortID(id) {
    return id.substring(0,15) + ".....";
  }

}
